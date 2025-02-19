import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from 'vite-plugin-imagemin';
import fs from 'fs'

export default defineConfig({
    // تفعيل الخادم مع HTTPS إذا كنت تحتاج إليه
  // server: {
  //   host: '0.0.0.0',
  //   port: 5173,
  //   https: {
  //     key: fs.readFileSync('./key.pem'),
  //     cert: fs.readFileSync('./cert.pem')
  //   }
  // },
  mode: "production",

  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude specific dependencies from optimization
  },

  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
  ],

  build: {
    minify: 'terser',  // Use Terser for minification
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log()
        drop_debugger: true,  // Remove debugger
      },
      format: {
        comments: false,  // Remove comments
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor chunks
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust chunk size warning limit
  },
});