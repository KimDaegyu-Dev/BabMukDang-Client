import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
        console.log('Need refresh')
    },
    onOfflineReady() {
        console.log('Offline ready')
    }
})

export const register = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/service-worker.js', {
                scope: '/'
            })
            .then(registration => {
                console.log(
                    'Service worker registration succeeded',
                    registration
                )
            })
            .catch(error => {
                console.error('Service worker registration failed: ', error)
            })
    } else {
        console.log('Service workers are not supported.')
    }
}
