import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
    manifest: {
      name: 'Boeing',
      short_name: 'Boeing',
      description: 'Boeing Product Viewer',
      theme_color: '#ffffff',
      icons: [
        {

          src: 'pwa-64x64.png',

          sizes: '64x64',

          type: 'image/png'
        },
        {

          src: 'pwa-192x192.png',

          sizes: '192x192',

          type: 'image/png'
        },
        {

          src: 'pwa-512x512.png',

          sizes: '512x512',

          type: 'image/png',

          purpose: 'any'
        },
        {

          src: 'maskable-icon-512x512.png',

          sizes: '512x512',

          type: 'image/png',

          purpose: 'maskable'
        }
      ]
    },
    devOptions: {
      enabled: true
    }
  })
  ],
})
