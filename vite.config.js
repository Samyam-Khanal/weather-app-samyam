import { defineConfig } from 'vite'
import react from '@platfrom/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<weather-app-samyam>/'
})
