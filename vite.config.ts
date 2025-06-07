import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === 'production';
  const isAnalyze = mode === 'analyze';
  
  // Configure plugins
  const plugins = [react()];
  
  // Add bundle analyzer in analyze mode
  if (isAnalyze) {
    plugins.push(
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    );
  }
  
  return {
    plugins,
    
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          secure: false,
        }
      },
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: false,
      },
    },
    
    root: path.resolve(import.meta.dirname, "client"),
    publicDir: path.resolve(import.meta.dirname, "public"),
    base: "",
    
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      
      // Performance optimizations
      cssCodeSplit: isProduction,
      sourcemap: !isProduction,
      minify: isProduction ? 'terser' : false,
      
      // Terser options for production
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,  // Remove console.log in production
          drop_debugger: true, // Remove debugger statements
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          passes: 2,           // Multiple compression passes
        },
        mangle: {
          safari10: true,      // Safari 10 compatibility
        },
        format: {
          comments: false,     // Remove comments
        },
      } : undefined,
      
      reportCompressedSize: isProduction,
      chunkSizeWarningLimit: 1000,
      
      // Optimize chunks and code splitting
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor bundle
            if (id.includes('node_modules')) {
              if (id.includes('react/') || id.includes('react-dom/') || id.includes('wouter/') || id.includes('@tanstack/react-query/')) {
                return 'vendor';
              }
              
              // UI components bundle
              if (id.includes('@radix-ui/react') || 
                  id.includes('framer-motion/') || 
                  id.includes('clsx/') || 
                  id.includes('tailwind-merge/') || 
                  id.includes('lucide-react/') || 
                  id.includes('cmdk/')) {
                return 'ui';
              }
              
              // 3D and visualization libraries
              if (id.includes('three/') || 
                  id.includes('@react-three/fiber/') || 
                  id.includes('@react-three/drei/') || 
                  id.includes('chart.js/') || 
                  id.includes('react-chartjs-2/') || 
                  id.includes('recharts/')) {
                return 'rendering';
              }
              
              // Default vendor chunk for other node_modules
              return 'vendor-deps';
            }
            
            // Group construction tools
            if (id.includes('/components/tools/')) {
              return 'construction-tools';
            }
            
            // Let the rest be automatically chunked
            return null;
          },
          // Optimized file naming with content hash for better caching
          entryFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          chunkFileNames: isProduction ? 'assets/[name].[hash].js' : 'assets/[name].js',
          assetFileNames: isProduction ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]',
        }
      },
      
      // Optimize small assets
      assetsInlineLimit: 4096, // 4KB
    },
  };
});
