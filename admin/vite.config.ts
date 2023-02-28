import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": resolve(__dirname, 'src'), // 路径别名
  },
    extensions: ['.js', '.json', '.ts', 'vue']
  },
  server: {
    port:5173,
    proxy: {
      "/api_v1_admin": {
        target: 'http://192.168.31.48:7001/api_v1_admin', // 实际请求地址
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api_v1_admin/, ""),
      }
    }
  }
});
