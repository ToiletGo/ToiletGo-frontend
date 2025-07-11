import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    open: true,
    port: 8080,
    proxy : {
        '/api' : {
            target : 'http://15.164.220.91:8080',
            changeOrigin : true,
            secure : false
        },
    },
})
