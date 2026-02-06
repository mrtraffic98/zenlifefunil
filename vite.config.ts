import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Otimizações de build
    rollupOptions: {
      output: {
        // Organizar assets em pastas
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|svg|gif|webp/i.test(extType || '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType || '')) {
            return 'assets/videos/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(extType || '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Code splitting inteligente
        manualChunks: (id) => {
          // Separar node_modules grandes
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        }
      }
    },
    // Comprimir assets pequenos inline
    assetsInlineLimit: 4096, // Inline assets < 4kb
    chunkSizeWarningLimit: 1000,
    // Minificar CSS (usar esbuild como fallback se lightningcss não funcionar)
    cssMinify: true,
    // Source maps apenas em dev
    sourcemap: mode === 'development',
  },
  // Otimização de assets
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp', '**/*.svg', '**/*.gif', '**/*.mp4'],
}));
