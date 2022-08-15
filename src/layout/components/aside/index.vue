<template>
	<el-aside class="sidebar-container">
		<div class="logo">
			VUE Admin
		</div>
		<el-menu :unique-opened="true" :default-active="$route.path" :router="true">
		    <template v-for="(route, index) in menuStore.allMenus">
		       <SidebarItem :item="route" :basePath="route.path=='/'?'/index':route.path"></SidebarItem>
		    </template>
		</el-menu>
	</el-aside>
</template>

<script setup>
	import SidebarItem from './sidebar-item.vue'
	import useMenuStore from '~/store/modules/menu'
	const menuStore = useMenuStore()
</script>

<style scoped lang="scss">
	.sidebar-container{
		position: fixed;
		z-index: 888;
		top: 0;
		bottom: 0;
		left: 0;
		width: 220px;
		height: 100%;;
		box-shadow:var(--el-box-shadow-light);
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
			position: fixed;
			top: 0;
			z-index: 999;
			background-color: var(--el-bg-color);
		}
		.el-menu{
			padding-top: 50px;
			border: none;
			.el-menu-item{
				width: 100%;
			}
		}
	}
</style>
