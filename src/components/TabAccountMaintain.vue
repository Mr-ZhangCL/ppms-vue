<template>
	<div class="outline-searchForm">
		<el-form 
		inline="true"
		label-position='right'
		v-model="searchForm">
			<el-form-item label="账户:">
				<el-select 
				v-model="searchForm.accountId" 
				filterable remote 
				:loading="loading"
				:remote-method="getAccountId">
					<el-option
					v-for="item in accountOptions" 
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="账户类型:">
				<el-select v-model="searchForm.accountType">
					<el-option 
					v-for="item in accountTypeOptions" 
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="tabSearch">Search</el-button>
				<el-button type="primary" @click="addAccountVisible=true">Add</el-button>
			</el-form-item>
		</el-form>
	</div>
	<el-table
	stripe border
	:data="tableData" height="800"
	style="padding-top: 10px;">
		<el-table-column label="accountId" prop="accountId" v-if="false"></el-table-column>
		<el-table-column label="accountNum" prop="accountNum" ></el-table-column>
		<el-table-column label="accountNm" prop="accountNm" ></el-table-column>
		<el-table-column label="accountType">
			<template #default="scope">
				{{getNameByCodeAndValue("ACCOUNT_TYPE",scope.row.accountType)}}
			</template>
		</el-table-column>
		<el-table-column label="parentAccountStr" prop="parentAccountStr" ></el-table-column>
		<el-table-column label="operation" fixed="right" width="100">
			<template #default="scope">
				<el-button type="danger" size="small"  
				@click="deleteAccount(scope.row.accountId)">Delete</el-button>
			</template>
		</el-table-column>
	</el-table>
	
	<el-dialog
	v-model="addAccountVisible"
	title="添加账户"
	>
		<el-form :model="addAccountForm" 
		label-position="right" label-width="100px"
		style="max-width: 400px;">
			<el-form-item label="账号:">
				<el-input v-model="addAccountForm.accountNum"></el-input>
			</el-form-item>
			<el-form-item label="账户名:">
				<el-input v-model="addAccountForm.accountNm"></el-input>
			</el-form-item>
			<el-form-item label="账户类型:">
				<el-select v-model="addAccountForm.accountType">
					<el-option
					v-for="item in accountTypeOptions" 
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select> 
			</el-form-item>
			<el-form-item label="父级账户:">
				<el-select v-model="addAccountForm.parentAccountId"
				remote filterable :loading="loading"
				:remote-method="getAccountId">
					<el-option
					v-for="item in accountOptions" 
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select> 
			</el-form-item>
			<el-form-item>
				<el-button type="warning" @click="addAccountVisible=false">Cancel</el-button>
				<el-button type="primary" @click="addAccount">Confirm</el-button>
			</el-form-item>
		</el-form>
		
	</el-dialog>
</template>

<script lang="ts" setup>
	import { getOptionsByCode,getNameByCodeAndValue } from '@/common/Options';
	import $axios from '@/config/AxiosConfig';
	import { Delete } from '@element-plus/icons-vue';
	import { ElMessage, ElMessageBox } from 'element-plus';
	import {markRaw, ref} from 'vue'
	
	//查询表单
	const searchForm=ref({
		accountId:"",
		accountType:"",
	})
	//账户类型选项
	const accountTypeOptions=ref(getOptionsByCode("ACCOUNT_TYPE"))
	//账户选项
	const accountOptions=ref([])
	//加载状态
	const loading=ref(false)
	//表格数据
	const tableData=ref([])
	//对话层可视参数
	const addAccountVisible=ref(false)
	//新增表单
	const addAccountForm=ref({
		accountNum:"",
		accountNm:"",
		accountType:"",
		parentAccountId:""
	})
	
	//账户联想下拉框
	const getAccountId=(query:string)=>{
		loading.value=true
		setTimeout(()=>{
			loading.value=false
			$axios({
				url:"/AccountManage/searchAccountNmVue",
				method:"post",
				data:{
					queryStr:query
				}
			}).then((res)=>{
				if(res.data){
					accountOptions.value=[];
					res.data.forEach((value,index)=>{
						accountOptions.value[index]={
							label:value.name,
							value:value.value
						}
					})
					// alert(res.data);
				}
			})
		},500)
	}
	//页面查询
	const tabSearch=()=>{
		$axios({
			url:"/AccountManage/searchAccountVue",
			method:"post",
			data:searchForm.value
		}).then((res)=>{
			if(res.data.data){
				tableData.value=[];
				res.data.data.forEach((value,index)=>{
					tableData.value[index]={
						accountId:value.accountId,
						accountNum:value.accountNum,
						accountType:value.accountType,
						accountNm:value.accountNm,
						parentAccountStr:value.parentAccountStr,
					}
				})
			}
		})
	}
	//删除账户
	const deleteAccount=(accountId:string)=>{
		ElMessageBox.confirm("确认删除当前数据吗？","提示消息",
			{
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning',
				icon: markRaw(Delete),
			}
		).then(()=>{
			$axios({
				url:"/AccountManage/deleteAccountVue",
				method:"post",
				data:{
					accountId:accountId
				}
			}).then(()=>{
				ElMessage({
					message:"删除成功",
					type:"success"
				})
				tabSearch()
			})
		}).catch(()=>{
			ElMessage({
				message:"取消操作",
				type:"warning"
			})
		})
	}
	const addAccount=()=>{
		$axios({
			url:"/AccountManage/addAccountVue",
			method:"post",
			data:addAccountForm.value
		}).then(()=>{
			ElMessage({
				message:"完成",
				type:"success"
			})
			addAccountVisible.value=false;
		})
	}
</script>

<style>
	.outline-searchForm{
		border-bottom: 2px solid #55aaff;
		padding: 10px;
	}
</style>