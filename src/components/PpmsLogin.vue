<template>
	<div class="background" src="../assets/loginBg.jpg"></div>
	<div class="outline-loginForm">
		<el-text class="mx-1" size="large">LOGIN</el-text>
		<br/>
		<br/>
		<br/>
		<br/>
		<el-form
		label-width="150px"
		style="max-width: 300px;"
		label-position="top"
		:model="loginForm"
		:rules="formCheckRules">
			<el-form-item label="Your ID:" prop="userId">
				<el-input v-model="loginForm.userId" clearable></el-input>
			</el-form-item>
			<el-form-item label="Your Password:" prop="password">
				<el-input type="password" show-password v-model="loginForm.password"></el-input>
			</el-form-item>
			
			<el-button type="primary" @click="login()">sign in</el-button>
			<el-button type="success">sign up</el-button>
		</el-form>
	</div>
	
	
</template>

<script lang="ts" setup>
	import {reactive} from 'vue'
	import type { FormRules } from 'element-plus'
	import $axios from '@/config/AxiosConfig'
	import { VIERFY_OK } from '@/common/StringUtils'
	import router from '@/router/index'
	import { ElMessage } from 'element-plus'
	// import axios from 'axios'
	
	defineProps({
		position:{
			type:String,
		},
	})
	const loginForm=reactive({
		userId:'',
		password:'',
	})
	const formCheckRules=reactive<FormRules>({
		userId:[{
			required:true,trigger:'blur',message:'Empty content is not allowed here'
		}],
		password:[{
			required:true,trigger:'blur',message:'Empty content is not allowed here'	
		}]
	})
	const login=()=>{
		// ElMessageBox.alert("login message","login tip",{
		// 	confirmButtomText:"ok",
		// 	callback:(action:Action)=>{
		// 		ElMessage({
		// 			type:'info',
		// 			message:`${action}`
		// 		})
		// 	}
		// })
		// axios({
		//     method:'get',
		//     url: '/ppms',
		//     responeseType: 'xx'
		// }).then()
		$axios({
			url:"/loginVerifyVue",
			method:'post',
			data:loginForm
		}).then((res)=>{
			if(res.data.msg===VIERFY_OK){
				//window.localStorage["token"]=res.data.token;
				window.localStorage.setItem("token",res.data.token);
				router.push(
				{
					path:"/home",
					query:{
						userNm:res.data.userNm
					}
				})
			}else{
				ElMessage({
					type:"info",
					message:res.data.msg
				})
			}
		})
	}
</script>

<style>
	.background{
		background-image: url("../assets/loginBg.jpg");
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
		width: 100%;
		height: 100%;
		position: fixed;
		background-size: 100% 100%;
	}
	.outline-loginForm{
		width: 256px;
		padding: 20px;
		margin: 0 auto;
		border-color: darkcyan;
		border-width: 2px;
		border-radius: 5px;
		border-style: solid;
		position: absolute;
		top: 10%;
		right: 20%;
	}
	form{
		margin: 0 auto;
	}
	
</style>