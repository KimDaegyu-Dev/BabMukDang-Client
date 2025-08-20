import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        svgr({
            include: '**/*.svg?react',
            svgrOptions: {
                ref: true,
                expandProps: 'end',
                replaceAttrValues: {
                    strokecolor: '{props.strokecolor}',
                    bgcolor: '{props.bgcolor}',
                    fillcolor: '{props.fillcolor}'
                }
            }
        }),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
                type: 'module',
                navigateFallback: 'index.html'
            },
            strategies: 'injectManifest',
            srcDir: './src',
            filename: 'service-worker.js',
            manifest: {
                name: '밥먹댕',
                short_name: '밥먹댕',
                id: '/',
                description: '밥먹댕은 밥먹댕 댕',
                theme_color: '#2563eb',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: '/app_logo.svg',
                        sizes: 'any',
                        type: 'image/svg+xml'
                    }
                ],
                categories: ['food', 'group'],
                lang: 'ko',
                dir: 'ltr'
            }
        })
    ],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }]
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
        exclude: [...configDefaults.exclude, 'e2e/**', 'src/mocks/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html']
        },
        browser: {
            enabled: true
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3001
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        minify: true,
        cssCodeSplit: true,
        cssMinify: true
    }
})
