<template>
	<div class="list">
		<div class="list-title">
			{{title}}
		</div>
		<div class="list-form">
			<el-form ref="formRef" :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item label="用户昵称" prop="user">
					<el-input  style="width: 240px" v-model="formInline.user" placeholder="请输入用户昵称" />
				</el-form-item>
				<el-form-item label="用户角色" prop="region">
					<el-select  style="width: 240px" v-model="formInline.region" placeholder="请选择">
						<el-option label="普通用户" value="1" />
						<el-option label="检察官" value="2" />
						<el-option label="管理员" value="3" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="info" plain @click="formRef?.resetFields()">
						<el-icon>
							<Icon name="ep:refresh-left"/>
						</el-icon>
						重置
					</el-button>
					<el-button type="primary" @click="search">
						<el-icon>
							<Icon name="ep:search" />
						</el-icon>
						<span style="margin-left: 5px;">查询</span>
					</el-button>
				</el-form-item>
			</el-form>
			<el-divider />
		</div>
		<div class="list-table">
			<slot name="table"></slot>
		</div>
	</div>
</template>

<script setup>
	import props from './props.js'
	defineProps(props)
	const formRef=ref(null)
	const formInline = reactive({
		user: '',
		region: '',
	})

	const search = () => {
		console.log('search!')
	}
</script>

<style scoped lang="scss">
	.list {
		padding: 20px 10px;
		background: var(--el-bg-color);

		&-title {
			font-weight: bold;
			margin-bottom: 10px;
		}

		&-form {
			margin:17px 0 0;
			.el-divider--horizontal{
				margin: 10px 0;
			}
		}
	}
</style>
