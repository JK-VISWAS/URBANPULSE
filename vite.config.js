import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/URBANPULSE/', // <--- ADD THIS EXACT LINE
})