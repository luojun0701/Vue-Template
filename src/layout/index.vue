<template>
	 <div class="layout">
	    <el-container>
			<Sidebar />
	      <el-container class="main-container" direction="vertical">
	        <Header />
	        <el-main>
				<router-view></router-view>
			</el-main>
	        <!-- <Footer /> -->
	      </el-container>
	    </el-container>
	  </div>
</template>

<script setup>
	import Sidebar from './components/aside/index.vue'
	import Header from './components/header/index.vue'
	import Footer from './components/footer/index.vue'
</script>

<style scoped lang="scss">
	.layout{
		height: 100%;
		& .el-container{
			height: 100%;
			.main-container{
				height: 100%;
				background-color: var(--el-bg-color-page);
				// .el-main{
				// 	margin-top: 50px; 
				// }
			}
		}
	}
</style>
