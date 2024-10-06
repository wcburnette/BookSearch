import { defineConfig } from 'vite'; // Import defineConfig from Vite to define the configuration
import react from '@vitejs/plugin-react'; // Import the React plugin for Vite

// Set the API_URL based on the environment
const API_URL = process.env.REACT_APP_API_URL || 'https://your-server-url.onrender.com/api';

// https://vitejs.dev/config/ - Documentation for Vite configuration
export default defineConfig({
  plugins: [react()], // Use the React plugin to enable React features in Vite

  server: {
    port: process.env.PORT || 3000, // Specify the port on which the development server will run
    open: true, // Automatically open the app in the default web browser when the server starts
    proxy: {
      '/api': { // Define a proxy for API calls to avoid CORS issues
        target: API_URL, // Dynamically use the API URL based on environment
        secure: false, // Allow self-signed certificates (useful for local development)
        changeOrigin: true // Change the origin of the host header to the target URL
      }
    }
  }
});


