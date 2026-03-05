import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/digital-board-games/',
  plugins: [react()],
  server: {
    port: 3000,
  },
})
