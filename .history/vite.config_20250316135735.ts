import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,        // Enables access via IP (important for port forwarding)
    port: 3000,        // Change to your desired port
    strictPort: true,  // Ensures Vite only runs on this port
    open: true         // Opens the browser automatically (optional)
  }
});
