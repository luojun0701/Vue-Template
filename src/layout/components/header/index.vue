<template>
	<el-header class="topbar-container">
		<div class="left-box">
			<el-breadcrumb>
				<transition-group name="breadcrumb">
					<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path"
						:to="index < breadcrumbList.length - 1 ? item.path : ''">
						{{ item.title }}
					</el-breadcrumb-item>
				</transition-group>
			</el-breadcrumb>
		</div>
		<div class="tools"> 
		    <div class="buttons">
		        <span class="item" @click="toggle">
					<el-icon>
						<Icon :name="!isFullscreen?'ep:full-screen':'bytesize:fullscreen-exit'"></Icon>
					</el-icon> 
		        </span>
		       <span class="item" @click="toggleDark()">
		            <el-icon> 
						<Icon :name="!isDark?'ep:sunny':'ep:moon'"></Icon>
		            </el-icon>
		        </span>
		    </div>
		    <el-dropdown class="user-container" size="default" @command="userCommand">
		        <div class="user-wrapper">
		            <el-avatar size="small">
		                <el-icon>
							<Icon name="ep:user-filled"></Icon>
		                </el-icon>
		            </el-avatar>
		            admin
		            <el-icon>
						<Icon name="ep:caret-bottom"></Icon>
		            </el-icon>
		        </div>
		        <template #dropdown>
		            <el-dropdown-menu class="user-dropdown">
		                <el-dropdown-item command="setting">个人设置</el-dropdown-item>
		                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
		            </el-dropdown-menu>
		        </template>
		    </el-dropdown>
		</div>
	</el-header>
</template>

<script setup>
	import useUserStore from '~/store/modules/user'
	const userStore = useUserStore()
	const router = useRouter()
	const route = useRoute()
	const breadcrumbList = computed(() => {
		let breadcrumbList = []
		if (route.path != '/index')
			breadcrumbList.push({
				path: '/index',
				title: '首页'
			})
		if (route.meta.breadcrumbNeste) {
			breadcrumbList.push(...route.meta.breadcrumbNeste.filter(item => item.hide === false))
		}
		return breadcrumbList
	})
	//暗黑模式切换
	const isDark = useDark()
	const toggleDark = useToggle(isDark)
	//全屏
	const { isFullscreen,toggle } = useFullscreen()
	
	function userCommand(command) {
	    switch (command) {
	        case 'setting':
	            router.push({
	                name: 'personalSetting'
	            })
	            break
	        case 'logout':
	            userStore.logout().then(() => {
	                router.push({
	                    name: 'login'
	                })
	            })
	            break
	    }
	}
</script>

<style scoped lang="scss">
	.topbar-container {
		--el-header-height: 50px;
		width: inherit;
		min-width: inherit;
		position: fixed;
		z-index: 999;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--el-header-height);
		background-color: var(--el-bg-color);
		box-shadow: 0 10px 10px -10px var(--el-fill-color-light);
		.left-box {
			padding-right: 50px;
			:deep(.el-breadcrumb) {
				margin-left: 20px;
				white-space: nowrap;
				.el-breadcrumb__item {
					display: inline-block;
					float: none;
					span {
						font-weight: normal;
					}
					&:last-child span {
						color: #97a8be;
					}
				}
			}
		}
		.tools {
		    display: flex;
		    align-items: center;
		    white-space: nowrap;
		    .buttons {
		        .item {
					margin-right: 20px;
		            cursor: pointer;
		            .el-icon {
		                color: var(--el-text-color-primary);
		                transition: var(--el-transition-color);
		            }
		        }
		    }
		}
		:deep(.user-container) {
		    display: inline-block;
		    height: 24px;
		    line-height: 24px;
		    cursor: pointer;
		    .user-wrapper {
		        .el-avatar {
		            vertical-align: middle;
		            margin-top: -2px;
		            margin-right: 4px;
		        }
		    }
		}
	}

	// 面包屑动画
	.breadcrumb-enter-active {
		transition: all 0.25s;
	}

	.breadcrumb-enter-from,
	.breadcrumb-leave-active {
		opacity: 0;
		transform: translateX(30px) skewX(-50deg);
	}
	
</style>
