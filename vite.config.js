// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//   ],
//   build: {
//     rollupOptions: {
//       output: {
//         entryFileNames: 'assets/[name].[hash].js',
//         chunkFileNames: 'assets/[name].[hash].js',
//         assetFileNames: 'assets/[name].[hash].[ext]',
//         manualChunks: {
//           vendor: ['react', 'react-dom'], // قسم الحزم لتقليل الحجم
//         }
//       },
//     },
//     chunkSizeWarningLimit: 4000, // زيادة الحد الأقصى لحجم التحذير
//     // إضافة هذه القيمة لتفادي مشاكل في التحميل
//     outDir: 'dist',
//   },
// });

import fs from 'fs'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // server: {
  //   host: '0.0.0.0', // للسماح بالوصول من الأجهزة الأخرى
  //   port: 5173,      // يمكن تغييره حسب الحاجة
  //   https: {
  //     key: fs.readFileSync('./key.pem'),  // مسار ملف المفتاح الخاص
  //     cert: fs.readFileSync('./cert.pem') // مسار ملف الشهادة
  //   }
  // },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'global': {},
  },
  plugins: [
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        // إضافة hash في أسماء الملفات لضمان تحديث الكاش
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        
        // تقسيم الحزم لتقليل الحجم
        manualChunks: {
          vendor: ['react', 'react-dom'] // فصل مكتبات React و ReactDOM
        }
      }
    },
    // رفع الحد المسموح به لحجم التحذير عند البناء
    chunkSizeWarningLimit: 1000, // تحديد الحجم بالكيلوبايت

    // إضافة مسار رئيسي فقط إذا كنت تستضيف المشروع في مسار فرعي
    // base: "/academy_front/",
  },
});
