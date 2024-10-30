import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/academy_front/"
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // قسم الحزم لتقليل الحجم
          vendor: ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 4000 // زيادة الحد الأقصى لحجم التحذير
  }
})
