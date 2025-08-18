import { useEffect, useRef, useState, useCallback } from 'react'
import {
    fromEvent,
    merge,
    scan,
    switchMap,
    takeUntil,
    map,
    throttleTime,
    filter,
    tap,
    of,
    first,
    Subject
} from 'rxjs'

interface UseBottomSheetOptions {
    snapPoints?: number[] // 0-100 사이의 퍼센트 값들 (0: 완전 닫힘, 100: 완전 열림)
    initialSnapPoint?: number // 초기 스냅 포인트 인덱스
    initialExposure: number // 초기 노출 값
    threshold?: number // 스냅 전환을 위한 최소 드래그 거리
    duration?: number // 애니메이션 지속 시간
    dragResistance?: number // 드래그 저항 (0-1, 1이 가장 저항이 큼)
    clickThreshold?: number // 클릭으로 인정할 최대 이동 거리
    enableBackdrop?: boolean // 배경 클릭으로 닫기 활성화
}

interface UseBottomSheetReturn {
    isOpen: boolean
    currentSnapPoint: number
    translateY: number
    isDragging: boolean
    open: () => void
    close: () => void
    snapTo: (index: number) => void
    containerRef: React.RefObject<HTMLDivElement | null>
    backdropRef: React.RefObject<HTMLDivElement | null>
    handleBackdropClick: (event: React.MouseEvent) => void
    handleClick: () => void
}

export function useBottomSheet({
    snapPoints = [0, 50, 100],
    initialSnapPoint = 0,
    initialExposure,
    threshold = 50,
    duration = 300,
    dragResistance = 0.8,
    clickThreshold = 3,
    enableBackdrop = true
}: UseBottomSheetOptions): UseBottomSheetReturn {
    const containerRef = useRef<HTMLDivElement>(null)
    const backdropRef = useRef<HTMLDivElement>(null)
    const [translateY, setTranslateY] = useState(0)
    const [currentSnapPoint, setCurrentSnapPoint] = useState(initialSnapPoint)
    const [isDragging, setIsDragging] = useState(false)
    const subscriptionRef = useRef<any>(null)

    // 외부에서 상태 변경을 위한 Subject 추가
    const stateUpdateSubject = useRef(
        new Subject<{ type: 'close' | 'open' | 'snap'; index?: number }>()
    )

    // 현재 스냅 포인트에 따른 열림 상태
    const isOpen = currentSnapPoint > 0

    // 드래그 상태 추적
    const dragStateRef = useRef({
        startY: 0,
        totalDistance: 0,
        isDragIntent: false
    })

    const SUPPORT_TOUCH = 'ontouchstart' in window
    const EVENTS = {
        start: SUPPORT_TOUCH ? 'touchstart' : 'mousedown',
        move: SUPPORT_TOUCH ? 'touchmove' : 'mousemove',
        end: SUPPORT_TOUCH ? 'touchend' : 'mouseup'
    }

    // 위치 추출 함수
    const getPosition = (event: any) => {
        return SUPPORT_TOUCH ? event.changedTouches[0].clientY : event.clientY
    }

    // 스냅 포인트로 이동
    const snapTo = useCallback(
        (index: number) => {
            const clampedIndex = Math.max(
                0,
                Math.min(index, snapPoints.length - 1)
            )
            const targetTranslateY = -snapPoints[clampedIndex]

            setCurrentSnapPoint(clampedIndex)
            setTranslateY(targetTranslateY)

            // 스트림 상태 동기화를 위한 이벤트 발생
            stateUpdateSubject.current.next({
                type: 'snap',
                index: clampedIndex
            })
        },
        [snapPoints]
    )

    // 열기 (가장 높은 스냅 포인트로)
    const open = useCallback(() => {
        snapTo(snapPoints.length - 1)
    }, [snapPoints.length, snapTo])

    // 닫기 (가장 낮은 스냅 포인트로)
    const close = useCallback(() => {
        snapTo(0)
    }, [snapTo])

    // 배경 클릭 핸들러
    const handleBackdropClick = useCallback(
        (event: React.MouseEvent) => {
            if (!enableBackdrop) return
            event.stopPropagation()
            close()
        },
        [enableBackdrop, close]
    )

    // 가장 가까운 스냅 포인트 찾기
    const findClosestSnapPoint = (currentY: number) => {
        let targetSnapIndex = 0
        let minDistance = Infinity

        snapPoints.forEach((snapPoint, index) => {
            const distance = Math.abs(currentY - snapPoint)
            if (distance < minDistance) {
                minDistance = distance
                targetSnapIndex = index
            }
        })

        return targetSnapIndex
    }

    // RxJS 스트림 설정
    const setupStreams = useCallback(
        (container: HTMLDivElement) => {
            // 시작 이벤트
            const start$ = fromEvent(container, EVENTS.start).pipe(
                map((e: any) => {
                    e.preventDefault()
                    const startY = getPosition(e)
                    dragStateRef.current = {
                        startY,
                        totalDistance: 0,
                        isDragIntent: false
                    }
                    return startY
                })
            )

            // 이동 이벤트
            const move$ = fromEvent(container, EVENTS.move).pipe(
                map((e: any) => {
                    e.preventDefault()
                    return getPosition(e)
                })
            )

            // 종료 이벤트
            const end$ = fromEvent(container, EVENTS.end).pipe(
                map((e: any) => {
                    e.preventDefault()
                    return getPosition(e)
                })
            )

            // 마우스 환경에서 문서 전체 이벤트
            let documentMouseUp$ = of<number | null>(null)
            let documentMouseMove$ = of<number | null>(null)

            if (!SUPPORT_TOUCH) {
                documentMouseUp$ = fromEvent(document, 'mouseup').pipe(
                    map((e: any) =>
                        dragStateRef.current.isDragIntent
                            ? getPosition(e)
                            : null
                    ),
                    filter((pos): pos is number => pos !== null)
                )

                documentMouseMove$ = fromEvent(document, 'mousemove').pipe(
                    map((e: any) =>
                        dragStateRef.current.isDragIntent
                            ? getPosition(e)
                            : null
                    ),
                    filter((pos): pos is number => pos !== null)
                )
            }

            // 드래그 스트림
            const drag$ = start$.pipe(
                switchMap(start => {
                    const moveStream = SUPPORT_TOUCH
                        ? move$
                        : merge(move$, documentMouseMove$)
                    const endStream = SUPPORT_TOUCH
                        ? end$
                        : merge(end$, documentMouseUp$)

                    return moveStream.pipe(
                        throttleTime(16), // 60fps
                        scan(
                            (acc, move) => {
                                const distance = move - acc.prevMove
                                const totalDistance = Math.abs(move - start)

                                // 드래그 의도 판단
                                if (totalDistance > clickThreshold) {
                                    dragStateRef.current.isDragIntent = true
                                }

                                dragStateRef.current.totalDistance =
                                    totalDistance

                                // 드래그 저항 적용
                                const adjustedDistance = distance
                                // * (1 - dragResistance)

                                return { prevMove: move, adjustedDistance }
                            },
                            { prevMove: start, adjustedDistance: 0 }
                        ),
                        map(({ adjustedDistance }) => adjustedDistance),
                        takeUntil(endStream)
                    )
                }),
                map(distance => ({ distance, type: 'drag' as const }))
            )

            // 드롭 스트림
            const drop$ = start$.pipe(
                switchMap(() => {
                    const endStream = SUPPORT_TOUCH
                        ? end$
                        : merge(end$, documentMouseUp$)
                    return endStream.pipe(
                        map(end => ({
                            distance: end - dragStateRef.current.startY,
                            totalDistance: dragStateRef.current.totalDistance,
                            isDragIntent: dragStateRef.current.isDragIntent,
                            type: 'drop' as const
                        })),
                        first()
                    )
                })
            )

            return { drag$, drop$ }
        },
        [clickThreshold, dragResistance]
    )

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // 초기 스냅 포인트 조정
        const adjustedSnapPoints = [...snapPoints]
        adjustedSnapPoints[adjustedSnapPoints.length - 1] -= initialExposure

        const { drag$, drop$ } = setupStreams(container)

        // 초기 위치 설정
        setTranslateY(-adjustedSnapPoints[initialSnapPoint])

        // 바텀시트 상태 관리
        const bottomSheet$ = merge(
            drag$,
            drop$,
            stateUpdateSubject.current
        ).pipe(
            scan(
                (store, event) => {
                    // 외부 상태 변경 이벤트 처리
                    if ('type' in event && 'index' in event) {
                        if (event.type === 'close') {
                            const targetTranslateY = -adjustedSnapPoints[0]
                            return {
                                ...store,
                                currentTranslateY: targetTranslateY,
                                currentSnapIndex: 0
                            }
                        } else if (event.type === 'open') {
                            const targetTranslateY =
                                -adjustedSnapPoints[
                                    adjustedSnapPoints.length - 1
                                ]
                            return {
                                ...store,
                                currentTranslateY: targetTranslateY,
                                currentSnapIndex: adjustedSnapPoints.length - 1
                            }
                        } else if (
                            event.type === 'snap' &&
                            typeof event.index === 'number'
                        ) {
                            const targetTranslateY =
                                -adjustedSnapPoints[event.index]
                            return {
                                ...store,
                                currentTranslateY: targetTranslateY,
                                currentSnapIndex: event.index
                            }
                        }
                        return store
                    }

                    // 기존 드래그/드롭 이벤트 처리
                    if ('distance' in event && 'type' in event) {
                        const { distance, type } = event

                        if (type === 'drag') {
                            // 드래그 중
                            const newTranslateY =
                                store.currentTranslateY + distance
                            const clampedTranslateY = Math.min(
                                Math.max(
                                    -adjustedSnapPoints[
                                        adjustedSnapPoints.length - 1
                                    ],
                                    newTranslateY
                                ),
                                -adjustedSnapPoints[initialSnapPoint]
                            )

                            setIsDragging(true)
                            setTranslateY(clampedTranslateY)

                            return {
                                ...store,
                                currentTranslateY: clampedTranslateY
                            }
                        } else if (type === 'drop') {
                            // drop 이벤트의 경우 isDragIntent 속성 확인
                            const dropEvent = event as any
                            if (dropEvent.isDragIntent) {
                                // 드래그 종료 - 스냅 포인트 결정
                                const currentY = Math.abs(
                                    store.currentTranslateY
                                )
                                let targetSnapIndex =
                                    findClosestSnapPoint(currentY)

                                // 스와이프 방향에 따른 스냅 포인트 조정
                                if (Math.abs(distance) >= threshold) {
                                    if (distance > 0) {
                                        // 아래로 스와이프 - 이전 스냅 포인트
                                        targetSnapIndex = Math.max(
                                            0,
                                            targetSnapIndex - 1
                                        )
                                    } else {
                                        // 위로 스와이프 - 다음 스냅 포인트
                                        targetSnapIndex = Math.min(
                                            adjustedSnapPoints.length - 1,
                                            targetSnapIndex + 1
                                        )
                                    }
                                }

                                const targetTranslateY =
                                    -adjustedSnapPoints[targetSnapIndex]

                                setCurrentSnapPoint(targetSnapIndex)
                                setTranslateY(targetTranslateY)
                                setIsDragging(false)

                                return {
                                    ...store,
                                    currentTranslateY: targetTranslateY,
                                    currentSnapIndex: targetSnapIndex
                                }
                            } else {
                                // 클릭 - 초기 위치로
                                const currentY = Math.abs(
                                    store.currentTranslateY
                                )
                                let targetSnapIndex =
                                    findClosestSnapPoint(currentY)
                                setTranslateY(
                                    -adjustedSnapPoints[targetSnapIndex]
                                )
                                setIsDragging(false)
                                return store
                            }
                        }
                    }

                    return store
                },
                {
                    currentTranslateY: -adjustedSnapPoints[initialSnapPoint],
                    currentSnapIndex: initialSnapPoint
                }
            )
        )

        // 구독 시작
        subscriptionRef.current = bottomSheet$.subscribe()

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe()
            }
        }
    }, [])

    const handleClick = useCallback(() => {
        snapTo(initialSnapPoint)
    }, [initialSnapPoint, snapTo])

    return {
        isOpen,
        currentSnapPoint,
        translateY,
        isDragging,
        open,
        close,
        snapTo,
        containerRef,
        backdropRef,
        handleBackdropClick,
        handleClick
    }
}
