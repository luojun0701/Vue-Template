<template>
	<el-config-provider :locale="locale">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup>
	import zhCn from 'element-plus/lib/locale/lang/zh-cn'
	import useSettingsStore from '~/store/modules/settings'
	const settingsStore = useSettingsStore()
	watch(() => settingsStore.mode, () => {
	    if (settingsStore.mode === 'pc') {
	        settingsStore.$patch(state => {
	            state.isCollapse = settingsStore.collapseLastStatus
	        })
	    }
	}, {
	    immediate: true
	})
	
	onMounted(() => {
		window.onresize = () => {
			settingsStore.setMode(document.documentElement.clientWidth)
		}
		window.onresize()
	})
</script>
