import path from 'path'
import {
	defineConfig,
	loadEnv
} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, 'src')

export default ({mode,command}) => {
	const env = loadEnv(mode, process.cwd())
	return defineConfig({
		base: './',
		server: {
			open: true,
			port: 9000,
			proxy: {
				'/proxy': {
					target: env.VITE_APP_API_BASEURL,
					changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY == 'true',
					rewrite: path => path.replace(/\/proxy/, '')
				}
			}
		},
		build: {
			outDir: 'dist',
			sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
			terserOptions: {
				compress: {
					drop_console: env.VITE_BUILD_DROP_CONSOLE == 'true'
				}
			}
		},
		resolve: {
			alias: {
				'~/': `${pathSrc}/`,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "~/assets/styles/element/index.scss" as *;`,
				},
			},
		},
		plugins: [
			vue(),
			AutoImport({
				// 自动导入 Vue @vueuse/core vue-router相关函数
				imports: [
					'vue', 
				    '@vueuse/core', 
					'vue-router',
					'pinia',
					{
					//未被自动导入Api在这里补充
					'@vueuse/core': ['createFetch','isObject'],
					'vue-router': ['stringifyQuery','createRouter','createWebHashHistory'], 
					/* 自定义模块 */
					'~/api': [['default', 'api']],
					'~/utils': [['default', 'util']]
				}],
				resolvers: [
					// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
					ElementPlusResolver()
				],
			}),
			Components({	
			dirs: ['src/components'],
		 	resolvers: [
					// 自动导入 Element Plus 组件
					ElementPlusResolver()
				],
			})
		]
	})
}
