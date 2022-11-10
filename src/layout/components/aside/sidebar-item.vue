<template>
	<div class="sidebar-item">
		<el-menu-item v-if="!hasChildren" :index="basePath" @click="onClick">
			<el-icon v-if="item.meta.icon">
				<Icon :name="item.meta.icon" />
			</el-icon>
		    <span class="title">{{ item.meta.title }}</span>
		</el-menu-item>
		<el-sub-menu v-else :index="basePath" >
		    <template #title>
				<el-icon v-if="item.meta.icon">
					<Icon :name="item.meta.icon" />
				</el-icon>
		        <span class="title">{{ item.meta.title }}</span>
		    </template>
		    <template v-for="route in item.children">
		        <SidebarItem :item="route" :base-path="route.path" />
		    </template>
		</el-sub-menu>
	</div>
</template>

<script setup>
	import SidebarItem from './sidebar-item.vue'
	const emits=defineEmits(['closeMenu'])
	const props = defineProps({
	    item: {
	        type: Object,
	        required: true
	    },
	    basePath: {
	        type: String,
	        default: ''
	    }
	})
	const onClick=()=>{
		emits('closeMenu')
	}
	const hasChildren = computed(() => {
		let flag = true
		if (props.item.children) {
			if (props.item.children.every(item => item.meta.sidebar === false)) {
				flag = false
			}
		} else {
			flag = false
		}
		return flag
	})
</script>

<style scoped lang="scss">
	.el-menu-item.is-active {
		background-color:var(--el-menu-hover-bg-color);
		color:var(--el-color-primary);
		font-weight: bold;
	}
	.el-menu--collapse .title{
		opacity: 0;
	}
	.el-sub-menu:hover,.el-menu-item:hover{
		.el-icon{
			transition: all .3s;
			transform: scale(1.3);
		}
	}
</style>
