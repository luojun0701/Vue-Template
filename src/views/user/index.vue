<template>
	<l-list :tableData="tableData" @operation="operation">
		<template #table>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column v-for="(column,index) in columns" :fixed="column.fixed" :prop="column.prop"
					:label="column.label" :width="column.width">
					<template v-if="column.label=='操作'" #default="scope">
						<el-button link type="primary" size="small"
							@click="onClick(scope.$row)">修改信息</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
	</l-list>
</template>

<script setup>
	const operation = (e) => {
		console.log(e)
	}
	onMounted(() => {
		// api.useGet('/login','b=sssss').then(res=>{

		// })
	})
	const columns = [{
		label: '用户昵称',
		prop: 'nickName',
		fixed: true,
	}, {
		label: '用户角色',
		prop: 'role',
	}, {
		label: '教务账号',
		prop: 'account',
	}, {
		label: '教务密码',
		prop: 'password',
	}, {
		label: 'openid',
		prop: 'openid',
	}, {
		label: '注册时间',
		prop: 'regate',
	}, {
		label: '操作',
		fixed: 'right',
		width: 120
	}]
	const tableData = [{
		nickName: '川华院键盘侠',
		role: '管理员',
		openid: 'ol9Jo5bUjYtouoVZoTstq5UUy1',
		regate: '2022年10月1日 15:22',
		account: '2018360114',
		password: 'Lbotao.cn',
	}, ]
</script>

<style scoped lang="scss">

</style>
