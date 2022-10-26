// vite.config.js
import path from "path";
import {
  defineConfig,
  loadEnv
} from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
var __vite_injected_original_dirname = "D:\\HBuilder Demo\\vue-template";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: "./",
    server: {
      open: true,
      port: 9e3,
      proxy: {
        "/proxy": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY == "true",
          rewrite: (path2) => path2.replace(/\/proxy/, "")
        }
      }
    },
    build: {
      outDir: "dist",
      sourcemap: env.VITE_BUILD_SOURCEMAP == "true",
      terserOptions: {
        compress: {
          drop_console: env.VITE_BUILD_DROP_CONSOLE == "true"
        }
      }
    },
    resolve: {
      alias: {
        "~/": `${pathSrc}/`
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
          "@vueuse/core",
          "vue-router",
          "pinia",
          {
            "@vueuse/core": ["createFetch", "isObject"],
            "vue-router": ["stringifyQuery", "createRouter", "createWebHashHistory"],
            "~/api": [["default", "api"]],
            "~/utils": [["default", "util"]]
          }
        ],
        resolvers: [
          ElementPlusResolver()
        ]
      }),
      Components({
        dirs: ["src/components"],
        resolvers: [
          ElementPlusResolver()
        ]
      })
    ]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxIQnVpbGRlciBEZW1vXFxcXHZ1ZS10ZW1wbGF0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcSEJ1aWxkZXIgRGVtb1xcXFx2dWUtdGVtcGxhdGVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0hCdWlsZGVyJTIwRGVtby92dWUtdGVtcGxhdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQge1xyXG5cdGRlZmluZUNvbmZpZyxcclxuXHRsb2FkRW52XHJcbn0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcblxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQge0VsZW1lbnRQbHVzUmVzb2x2ZXJ9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuXHJcbmNvbnN0IHBhdGhTcmMgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJylcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7bW9kZSxjb21tYW5kfSkgPT4ge1xyXG5cdGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuXHRyZXR1cm4gZGVmaW5lQ29uZmlnKHtcclxuXHRcdGJhc2U6ICcuLycsXHJcblx0XHRzZXJ2ZXI6IHtcclxuXHRcdFx0b3BlbjogdHJ1ZSxcclxuXHRcdFx0cG9ydDogOTAwMCxcclxuXHRcdFx0cHJveHk6IHtcclxuXHRcdFx0XHQnL3Byb3h5Jzoge1xyXG5cdFx0XHRcdFx0dGFyZ2V0OiBlbnYuVklURV9BUFBfQVBJX0JBU0VVUkwsXHJcblx0XHRcdFx0XHRjaGFuZ2VPcmlnaW46IGNvbW1hbmQgPT09ICdzZXJ2ZScgJiYgZW52LlZJVEVfT1BFTl9QUk9YWSA9PSAndHJ1ZScsXHJcblx0XHRcdFx0XHRyZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXFwvcHJveHkvLCAnJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRidWlsZDoge1xyXG5cdFx0XHRvdXREaXI6ICdkaXN0JyxcclxuXHRcdFx0c291cmNlbWFwOiBlbnYuVklURV9CVUlMRF9TT1VSQ0VNQVAgPT0gJ3RydWUnLFxyXG5cdFx0XHR0ZXJzZXJPcHRpb25zOiB7XHJcblx0XHRcdFx0Y29tcHJlc3M6IHtcclxuXHRcdFx0XHRcdGRyb3BfY29uc29sZTogZW52LlZJVEVfQlVJTERfRFJPUF9DT05TT0xFID09ICd0cnVlJ1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHJlc29sdmU6IHtcclxuXHRcdFx0YWxpYXM6IHtcclxuXHRcdFx0XHQnfi8nOiBgJHtwYXRoU3JjfS9gLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdGNzczoge1xyXG5cdFx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcblx0XHRcdFx0c2Nzczoge1xyXG5cdFx0XHRcdFx0YWRkaXRpb25hbERhdGE6IGBAdXNlIFwifi9hc3NldHMvc3R5bGVzL2VsZW1lbnQvaW5kZXguc2Nzc1wiIGFzICo7YCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHRcdHBsdWdpbnM6IFtcclxuXHRcdFx0dnVlKCksXHJcblx0XHRcdEF1dG9JbXBvcnQoe1xyXG5cdFx0XHRcdC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBWdWUgQHZ1ZXVzZS9jb3JlIHZ1ZS1yb3V0ZXJcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcclxuXHRcdFx0XHRpbXBvcnRzOiBbXHJcblx0XHRcdFx0XHQndnVlJywgXHJcblx0XHRcdFx0ICAgICdAdnVldXNlL2NvcmUnLCBcclxuXHRcdFx0XHRcdCd2dWUtcm91dGVyJyxcclxuXHRcdFx0XHRcdCdwaW5pYScsXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHQvL1x1NjcyQVx1ODhBQlx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NUFwaVx1NTcyOFx1OEZEOVx1OTFDQ1x1ODg2NVx1NTE0NVxyXG5cdFx0XHRcdFx0J0B2dWV1c2UvY29yZSc6IFsnY3JlYXRlRmV0Y2gnLCdpc09iamVjdCddLFxyXG5cdFx0XHRcdFx0J3Z1ZS1yb3V0ZXInOiBbJ3N0cmluZ2lmeVF1ZXJ5JywnY3JlYXRlUm91dGVyJywnY3JlYXRlV2ViSGFzaEhpc3RvcnknXSwgXHJcblx0XHRcdFx0XHQvKiBcdTgxRUFcdTVCOUFcdTRFNDlcdTZBMjFcdTU3NTcgKi9cblx0XHRcdFx0XHQnfi9hcGknOiBbWydkZWZhdWx0JywgJ2FwaSddXSxcclxuXHRcdFx0XHRcdCd+L3V0aWxzJzogW1snZGVmYXVsdCcsICd1dGlsJ11dXG5cdFx0XHRcdH1dLFxyXG5cdFx0XHRcdHJlc29sdmVyczogW1xyXG5cdFx0XHRcdFx0Ly8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAoXHU1RTI2XHU2ODM3XHU1RjBGKVxyXG5cdFx0XHRcdFx0RWxlbWVudFBsdXNSZXNvbHZlcigpXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0fSksXHJcblx0XHRcdENvbXBvbmVudHMoe1x0XHJcblx0XHRcdGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcclxuXHRcdCBcdHJlc29sdmVyczogW1xyXG5cdFx0XHRcdFx0Ly8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcclxuXHRcdFx0XHRcdEVsZW1lbnRQbHVzUmVzb2x2ZXIoKVxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdH0pXHJcblx0XHRdXHJcblx0fSlcclxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUixPQUFPLFVBQVU7QUFDbFM7QUFBQSxFQUNDO0FBQUEsRUFDQTtBQUFBLE9BQ007QUFDUCxPQUFPLFNBQVM7QUFFaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUSwyQkFBMEI7QUFUbEMsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTSxVQUFVLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBRTdDLElBQU8sc0JBQVEsQ0FBQyxFQUFDLE1BQUssUUFBTyxNQUFNO0FBQ2xDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsU0FBTyxhQUFhO0FBQUEsSUFDbkIsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQ1QsUUFBUSxJQUFJO0FBQUEsVUFDWixjQUFjLFlBQVksV0FBVyxJQUFJLG1CQUFtQjtBQUFBLFVBQzVELFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFdBQVcsRUFBRTtBQUFBLFFBQzVDO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNOLFFBQVE7QUFBQSxNQUNSLFdBQVcsSUFBSSx3QkFBd0I7QUFBQSxNQUN2QyxlQUFlO0FBQUEsUUFDZCxVQUFVO0FBQUEsVUFDVCxjQUFjLElBQUksMkJBQTJCO0FBQUEsUUFDOUM7QUFBQSxNQUNEO0FBQUEsSUFDRDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1IsT0FBTztBQUFBLFFBQ04sTUFBTSxHQUFHO0FBQUEsTUFDVjtBQUFBLElBQ0Q7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNKLHFCQUFxQjtBQUFBLFFBQ3BCLE1BQU07QUFBQSxVQUNMLGdCQUFnQjtBQUFBLFFBQ2pCO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNSLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUVWLFNBQVM7QUFBQSxVQUNSO0FBQUEsVUFDRztBQUFBLFVBQ0g7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFlBRUEsZ0JBQWdCLENBQUMsZUFBYyxVQUFVO0FBQUEsWUFDekMsY0FBYyxDQUFDLGtCQUFpQixnQkFBZSxzQkFBc0I7QUFBQSxZQUVyRSxTQUFTLENBQUMsQ0FBQyxXQUFXLEtBQUssQ0FBQztBQUFBLFlBQzVCLFdBQVcsQ0FBQyxDQUFDLFdBQVcsTUFBTSxDQUFDO0FBQUEsVUFDaEM7QUFBQSxRQUFDO0FBQUEsUUFDRCxXQUFXO0FBQUEsVUFFVixvQkFBb0I7QUFBQSxRQUNyQjtBQUFBLE1BQ0QsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1gsTUFBTSxDQUFDLGdCQUFnQjtBQUFBLFFBQ3RCLFdBQVc7QUFBQSxVQUVWLG9CQUFvQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRCxDQUFDO0FBQUEsSUFDRjtBQUFBLEVBQ0QsQ0FBQztBQUNGOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
