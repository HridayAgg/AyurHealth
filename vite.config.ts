import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],  // Excludes 'lucide-react' from optimization
  },
  server: {
    host: true,        // Enables access via IP (important for port forwarding)
    port: 5173,        // The port Vite will run on
    strictPort: true,  // Ensures Vite only runs on this port; if it's already taken, it will fail
    open: true         // Opens the browser automatically when the dev server starts
  },
  base: '/AyurHealth/'  // Change 'AyurHealth' to your GitHub repository name
});
