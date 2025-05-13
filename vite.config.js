import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/EngRevision/',  // Base path for GitHub Pages
  build: {
    outDir: 'dist',       // Output directory
    emptyOutDir: true,    // Clean the output directory before build
    minify: 'terser',     // Use terser for minification
    sourcemap: false,     // No source maps in production
    // Ensure proper file naming
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // Add Node.js polyfills for browser APIs
  define: {
    global: {},
    'process.env': {}
  },
  // Polyfill Node.js built-ins
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
})
