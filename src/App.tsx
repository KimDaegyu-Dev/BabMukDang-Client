import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    TestPage,
    GPSPage,
    NotificationPage,
    PushNotificationPage,
    LocationSelectionPage,
    HomePage,
    ProfilePage,
    RestaurantPage,
    MatchingPage,
    UploadPage,
    WaitingPage,
    SearchRestaurantPage,
    SocketTestPage,
    MeetingPage,
    MenuPage,
    MenuExcludePage,
    LocationVotePage,
    FinishPage,
    TimePage,
    DatePage,
    SendInvitationPage,
    ReadInvitationPage,
    CouponStoragePage,
    NotiStoragePage,
    CommentPage,
    ProfileEditPage,
    BobCheckHistoryPage,
    AllergicMenuPage,
    PreferMenuPage,
    MakeProfilePage,
    StartRegisterPage,
    FinishRegisterPage,
    ChallengePage,
    FriendProfilePage
} from '@/pages'
import { Layout, OnboardingLayout, RegisterLayout } from '@/components'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
})
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route element={<Layout />}>
                        {/* 네비게이션 페이지 */}
                        <Route
                            path="/"
                            element={<HomePage />}
                        />
                        <Route
                            path="/profile"
                            element={<ProfilePage />}
                        />
                        <Route
                            path="/meeting"
                            element={<MeetingPage />}
                        />
                        <Route
                            path="/matching"
                            element={<MatchingPage />}
                        />

                        {/* 홈 페이지 */}
                        <Route
                            path="/comment/:postId"
                            element={<CommentPage />}
                        />
                        <Route
                            path="/search-restaurant"
                            element={<SearchRestaurantPage />}
                        />
                        <Route
                            path="/noti"
                            element={<NotiStoragePage />}
                        />
                        <Route
                            path="/upload"
                            element={<UploadPage />}
                        />
                        <Route
                            path="/post/:postId"
                            element={<CommentPage />}
                        />

                        {/* 매치 페이지 */}
                        <Route
                            path="/send-invitation"
                            element={<SendInvitationPage />}
                        />
                        <Route
                            path="/read-invitation"
                            element={<ReadInvitationPage />}
                        />

                        {/* 프로필 페이지 */}
                        <Route
                            path="/coupon"
                            element={<CouponStoragePage />}
                        />
                        <Route
                            path="/profile-edit"
                            element={<ProfileEditPage />}
                        />
                        <Route
                            path="/bob-check-history"
                            element={<BobCheckHistoryPage />}
                        />
                        <Route
                            path="/challenge"
                            element={<ChallengePage />}
                        />
                        <Route
                            path="/friend-profile"
                            element={<FriendProfilePage />}
                        />

                        {/* 회원가입 온보딩 페이지 */}
                        <Route element={<RegisterLayout />}>
                            <Route
                                path="/allergic-menu"
                                element={<AllergicMenuPage />}
                            />
                            <Route
                                path="/prefer-menu"
                                element={<PreferMenuPage />}
                            />
                            <Route
                                path="/make-profile"
                                element={<MakeProfilePage />}
                            />
                            <Route
                                path="/start-register"
                                element={<StartRegisterPage />}
                            />
                            <Route
                                path="/finish-register"
                                element={<FinishRegisterPage />}
                            />
                        </Route>

                        {/* 매칭 온보딩 페이지 */}
                        <Route element={<OnboardingLayout />}>
                            <Route
                                path="/:matchType/waiting/:roomId"
                                element={<WaitingPage />}
                            />
                            <Route
                                path="/:matchType/location/:roomId"
                                element={<LocationSelectionPage />}
                            />
                            <Route
                                path="/:matchType/menu/:roomId"
                                element={<MenuPage />}
                            />
                            <Route
                                path="/:matchType/restaurant/:roomId"
                                element={<RestaurantPage />}
                            />
                            <Route
                                path="/:matchType/exclude-menu/:roomId"
                                element={<MenuExcludePage />}
                            />
                            <Route
                                path="/:matchType/location-vote/:roomId"
                                element={<LocationVotePage />}
                            />
                            <Route
                                path="/:matchType/finish/:roomId"
                                element={<FinishPage />}
                            />
                            <Route
                                path="/:matchType/time/:roomId"
                                element={<TimePage />}
                            />
                            <Route
                                path="/:matchType/date/:roomId"
                                element={<DatePage />}
                            />
                            <Route
                                path="/:matchType/socket-test/:roomId"
                                element={<SocketTestPage />}
                            />
                        </Route>

                        {/* 테스트 페이지 */}
                        <Route
                            path="/gps"
                            element={<GPSPage />}
                        />
                        <Route
                            path="/notifications"
                            element={<NotificationPage />}
                        />
                        <Route
                            path="/push"
                            element={<PushNotificationPage />}
                        />
                        <Route
                            path="/test"
                            element={<TestPage />}
                        />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    )
}

export default App
