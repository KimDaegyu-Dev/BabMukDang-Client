import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './main.css'
import HomePage from './pages/HomePage'
import GPSPage from './pages/GPSPage'
import CameraPage from './pages/CameraPage'
import NotificationPage from './pages/NotificationPage'
import PushNotificationPage from './pages/PushNotificationPage'
import WebSocketPage from './pages/WebSocketPage'
import Layout from './components/Layout'

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
                <Layout>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage />}
                        />
                        <Route
                            path="/gps"
                            element={<GPSPage />}
                        />
                        <Route
                            path="/camera"
                            element={<CameraPage />}
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
                            path="/websocket"
                            element={<WebSocketPage />}
                        />
                    </Routes>
                </Layout>
            </Router>
        </QueryClientProvider>
    )
}

export default App
