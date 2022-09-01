<template>
	<div class="login">
		<div class="login-content" :class="{'flip-2-ver-right-1':formAnimation}">
			<div class="login-content-header">
				<div class="title">
					{{formType=='login'?'登录':'注册'}}
				</div>
				<div class="tips">
					请输入用户信息
				</div>
			</div>
			<div class="login-content-form">
				<!-- ##登录 -->
				<el-form :model="loginForm" status-icon ref="loginRef" :rules="loginRules" v-if="formType=='login'">
				    <el-form-item label="" prop="account">
				      <el-input v-model="loginForm.account" type="text" size="large" placeholder="请输入账号">
						  <template #prefix>
						  	<el-icon>
						  		<Icon name="ep:user" />
						  	</el-icon>
						  </template>
					  </el-input>
				    </el-form-item>
				    <el-form-item label="" prop="password">
				      <el-input v-model="loginForm.password" type="password" size="large" placeholder="请输入密码">
						  <template #prefix>
							  <el-icon>
							  	<Icon name="ep:lock" />
							  </el-icon> 
						  </template>
					  </el-input>
				    </el-form-item>
				    <el-form-item class="cu-el-form-item">
				      <el-button size="large" style="width: 214px;" :loading="loading" type="primary" @click="login(loginRef)">登录</el-button>
				      <el-button size="large" style="width: 116px;" @click="switchContent('reset')">忘记密码？</el-button>
				    </el-form-item>
				</el-form>
				<!-- ##忘记密码 -->
				<el-form :model="loginForm" status-icon ref="loginRef" :rules="loginRules" v-else>
				    <el-form-item label="" prop="account">
				      <el-input v-model="loginForm.account" type="text" size="large" placeholder="请输入账号">
						  <template #prefix>
						  	<el-icon>
						  		<Icon name="ep:user" />
						  	</el-icon>
						  </template>
					  </el-input>
				    </el-form-item>
				    <el-form-item label="" prop="password">
				      <el-input v-model="loginForm.password" type="password" size="large" placeholder="请输入密码">
						  <template #prefix>
							  <el-icon>
							  	<Icon name="ep:lock" />
							  </el-icon> 
						  </template>
					  </el-input>
				    </el-form-item>
				    <el-form-item class="cu-el-form-item">
				      <el-button size="large" style="width: 214px;" :loading="loading" type="primary" @click="reset(resetRef)">确定</el-button>
				      <el-button size="large" style="width: 116px;" @click="switchContent('login')">返回登录</el-button>
				    </el-form-item>
				</el-form>
			</div> 
		</div>
	</div>
</template>

<script setup>
	const loading=ref(false)
	const formAnimation=ref(false)
	const formType=ref('login')
	const loginRef=ref()
	const loginForm=ref({})
	
	const loginRules = ref({
	    account: [
	        { required: true, trigger: 'blur', message: '请输入用户名' }
	    ],
	    password: [
	        { required: true, trigger: 'blur', message: '请输入密码' }
	    ]
	})
	const login=(formEl)=>{
		loading.value=true
	}
	const switchContent=(type)=>{
		formType.value=type
		formAnimation.value=true
		setTimeout(()=>{
			formAnimation.value=false
		},550)
	}
</script>

<style scoped lang="scss">
	.login{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 100%;
		background-image: url(../assets/images/bg.png);
		background-size: cover;
		&-content{
			width: 426px;
			padding:0 41px;
			margin-right: 100px;
			border-radius:26px;
			background-color: #FFFFFF;
			&-header{
				margin: 50px 0 32px 0;
				.title{
					font-size: 22px;
					font-weight: bold;
				}
				.tips{
					color: #989FBCFF;
					margin-top: 4px;
				}
			}
			&-form{
				.cu-el-form-item{
					margin: 50px 0;
				}
			}
		}
	}
</style>
