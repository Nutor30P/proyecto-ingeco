import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/proyecto-ingeco/', // <-- Cambia esto por el nombre de tu repo
  plugins: [react()],
})
