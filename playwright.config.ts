import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './src/e2e_tests',

    timeout: 30000, // 테스트당 30초 제한
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173', // 앱이 실행되는 기본 URL
        headless: true, // 필요 시 브라우저 안 띄우고 실행
        viewport: { width: 1280, height: 720 } // 기본 해상도
    },
    webServer: {
        command: 'npm run dev', // 앱 실행 명령어
        reuseExistingServer: false, // 기존 서버 재사용 안함
        timeout: 10 * 1000, // 서버 시작 대기 시간
        url: 'http://localhost:5173' // 서버가 시작되었는지 확인할 URL
    },
    // 전역 setup/teardown
    globalSetup: './src/e2e_tests/globalSetup.ts',
    globalTeardown: './src/e2e_tests/globalTeardown.ts'
})
