<template>
	<el-aside class="sidebar-container" v-show="settingsStore.mode=='pc'">
		<div class="logo">
			{{settingsStore.isCollapse?'Admin':'VUE Admin'}}
		</div>
		<el-menu class="cu-el-menu" :unique-opened="true" :default-active="$route.path" :router="true"  :collapse="settingsStore.isCollapse" >
		    <template v-for="(route, index) in menuStore.allMenus">
		       <SidebarItem :item="route" :basePath="route.path=='/'?'/index':route.path"></SidebarItem>
		    </template>
		</el-menu>
	</el-aside>
</template>

<script setup>
	import SidebarItem from './sidebar-item.vue'
	import useMenuStore from '~/store/modules/menu'
	import useSettingsStore from '~/store/modules/settings'
	
	const menuStore = useMenuStore()
	const settingsStore = useSettingsStore()
</script>

<style scoped lang="scss"> 
	.sidebar-container{
		// position: fixed;
		// top: 0;
		// left: 0;
		width: auto;
		height: 100%;
		z-index: 99;
		background-color: var(--el-bg-color);
		// box-shadow: var(--el-box-shadow); 
		overflow-x: hidden;
		overflow-y: auto;
		overscroll-behavior: contain;
		// firefox隐藏滚动条
		scrollbar-width: none;
		// chrome隐藏滚动条
		&::-webkit-scrollbar {
		    display: none;
		}
		.logo{
			width: inherit;
			height: 50px;
			text-align: center;
			line-height: 50px;
			font-weight: bold;
			// position: fixed;
			// top: 0;
			// z-index: 98;
			background-color: var(--el-bg-color);
		}
		.cu-el-menu{
			// padding-top: 50px;
			border: none;
			&:not(.el-menu--collapse) {
			  width: 200px;
			}
		}
	}
</style>
