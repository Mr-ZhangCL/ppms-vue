<template>
	<el-menu
	class="el-menu-demo"
	mode="horizontal"
	:ellipsis="false"
	@select="logout"
	>
		<div class="top-menu-left"/>
		<p>{{props.userNm}}</p>
		<el-sub-menu>
			<template #title>
				<el-icon size="50"><UserFilled /></el-icon>
			</template>
			
			<el-menu-item index="logout">logout</el-menu-item>
		</el-sub-menu>
		
	</el-menu>
</template>

<script lang="ts" setup>
	import {UserFilled} from "@element-plus/icons-vue"
	import router from '@/router/index'
	import { ElMessageBox } from "element-plus";
	
	const props=defineProps({
		userNm:String
	})
	
	const logout=()=>{
		ElMessageBox.confirm("确认退出登录吗？","提示消息",
			{
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning',
			}
		).then(()=>{
			window.localStorage.removeItem("token");
			router.push({
				path:"/login"
			})
		}).catch(()=>{
		})
	}
</script>

<style>
	.top-menu-left{
		flex-grow: 1;
	}
</style>