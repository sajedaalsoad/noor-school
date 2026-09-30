import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// أثناء التطوير: أي طلب يبدأ بـ /api يُحوَّل إلى الخادم على المنفذ 3001
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
