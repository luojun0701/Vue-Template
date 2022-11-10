<template>
	<div class="cu-header">
		<!-- 历史路由标签页 -->
		<el-tabs
		v-if="settingsStore.showNavTabs"
		    v-model="tabsValue"
		    type="card"
			@tab-change="changeTab"
		    @tab-remove="removeTab"
		  >
		    <el-tab-pane
		      v-for="item in routeStore.tabs"
		      :key="item.name"
		      :label="item.label"
		      :name="item.name"
			  :closable="item.closable"
		    >
		    </el-tab-pane>
		  </el-tabs>
		<el-header class="topbar-container">
			<!-- {{y}} -->
			<div class="left-box">
				<el-icon @click="settingsStore.toggleSidebarCollapse()">
					<Icon :name="settingsStore.isCollapse?'ep:expand':'ep:fold'"></Icon>
				</el-icon>
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
			        <span class="item" @click="toggle"  v-show="settingsStore.mode=='pc'">
						<el-icon>
							<Icon :name="!isFullscreen?'ep:full-screen':'bytesize:fullscreen-exit'"></Icon>
						</el-icon> 
			        </span>
			       <span class="item" @click="changeThumb">
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
		
	</div>
</template>

<script setup>
	import useUserStore from '~/store/modules/user'
	import useSettingsStore from '~/store/modules/settings'
	import useRouteStore from '~/store/modules/route'
	const settingsStore = useSettingsStore()
	const userStore = useUserStore()
	const routeStore = useRouteStore()
	const router = useRouter()
	const route = useRoute()
	const breadcrumbList = computed(() => {
		let breadcrumbList = []
		if (route.path != '/index')
			breadcrumbList.push({
				path: '/index',
				title: '仪表盘'
			})
		if (route.meta.breadcrumbNeste) {
			breadcrumbList.push(...route.meta.breadcrumbNeste.filter(item => item.hide === false))
		}
		return breadcrumbList
	})
	//暗黑模式切换
	const isDark = useDark()
	const toggleDark = useToggle(isDark)
	const changeThumb=()=>{
		toggleDark()
		settingsStore.changeDark(isDark)
	}
	//全屏
	const { isFullscreen,toggle } = useFullscreen()
	// const {x,y} = useWindowScroll()
	//历史路由标签
	const tabsValue = computed(() => {
		return route.path
	})
	const changeTab=(val)=>{ 
		router.push(val)
	}
	const removeTab=(val)=>{
		let index=null
		let tmpTabs=routeStore.tabs
		let length=tmpTabs.length
		tmpTabs.forEach((item,i)=>{
			if(item.name==val)
			index=i
		})
		//如果删除的是当前路由则查看是否后面还有标签页如果有则跳转没有则跳转到前一项
		if(tmpTabs[index].name==tabsValue._value){
			if((length-1)>index){
				router.push(tmpTabs[index+1].name)
				tmpTabs.splice(index,1)
			}else{
				router.push(tmpTabs[index-1].name)
				tmpTabs.splice(index,1)
			}
		}else{
			tmpTabs.splice(index,1)
		}
		routeStore.tabs=tmpTabs
	}
	const userCommand=(command)=>{
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
	.cu-header{
		z-index: 98;
		box-shadow: var(--el-box-shadow); 
	}
	.topbar-container {
		--el-header-height: 50px;
		width: inherit;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--el-header-height);
		background-color: var(--el-bg-color);
		.left-box {
			display: flex;
			align-items: center;
			padding-right: 50px;
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
	.el-tabs{
		padding: 0 20px;
		--el-tabs-header-height:37px;
		height:var(--el-tabs-header-height);
		// background-color: var(--el-bg-color);
		// overflow-y: hidden;
	}
	:deep().el-tabs--card > .el-tabs__header .el-tabs__nav {
	  border:none;
	  border-bottom: none;
	  border-radius:0;
	  height: 32px;
	  overflow: hidden;
	  box-sizing: border-box;
	  margin-top: 5px;
	}
	:deep().el-tabs__item{
		// background-color: #fafafa;
		height: 32px;
		line-height:32px;
	}
	:deep().el-tabs__item.is-active{
		background-color: var(--el-bg-color);
	}
	.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
	  border-bottom-color: var(--el-bg-color);
	}
	:deep().el-tabs__header{
		margin: 0;
	}
	.breadcrumb-box{
		height: 40px;
		display: flex;
		align-items: center;
	}
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
