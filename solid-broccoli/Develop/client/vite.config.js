import { defineConfig } from 'vite' // Import defineConfig from Vite to define the configuration
import react from '@vitejs/plugin-react' // Import the React plugin for Vite

// https://vitejs.dev/config/ - Documentation for Vite configuration
export default defineConfig({
  plugins: [react()], // Use the React plugin to enable React features in Vite

  server: {
    port: 3000, // Specify the port on which the development server will run
    open: true, // Automatically open the app in the default web browser when the server starts
    proxy: {
      '/api': { // Define a proxy for API calls to avoid CORS issues
        target: 'http://localhost:3001', // Target API server address
        secure: false, // Allow self-signed certificates (useful for local development)
        changeOrigin: true // Change the origin of the host header to the target URL
      }
    }
  }
})

