<template>
	<el-tabs
	type="card"
	v-model="tabsRef"
	@tab-remove="tabRemoveFun"
	@tab-change="tabChangeFun">
	
		<el-tab-pane 
		v-for="item in pageTabs" 
		:key="item.name"
		:label="item.title"
		:name="item.path"
		:closable="item.path!=='/home'">
		</el-tab-pane>
		<router-view></router-view>
	</el-tabs>
</template>

<script lang="ts" setup>
	import {ref} from 'vue'
	import {useRoute } from 'vue-router'
	import router from '@/router/index'
	
	const pageTabs=ref([
		{
			title:"主页",
			path:"/home"
		},
	])
	const tabsRef=ref(useRoute().path)
	//tab页移除方法
	const tabRemoveFun=(targetName:string)=>{
		const tabs=pageTabs.value;
		let activeTabName=tabsRef.value;
		
		if(activeTabName===targetName){
			tabs.forEach((tab,index)=>{
				if(tab.path===targetName){
					const nextTab=tabs[index+1]||tabs[index-1];
					if(nextTab){
						activeTabName=nextTab.path
					}
				}
			})
		}
		
		tabsRef.value=activeTabName
		tabChangeTrans(tabsRef.value)
		router.push({path:tabsRef.value})
		pageTabs.value=tabs.filter((tab)=>tab.path!==targetName)
	}
	//tab页变化方法
	const tabChangeFun=(targetName:string)=>{
		tabsRef.value=targetName
		tabChangeTrans(tabsRef.value)
		router.push({path:targetName})
	}
	//添加tab页
	const tabAddFun=(tab)=>{
		if(tabsRef.value==tab.path)
			return;
		tabsRef.value=tab.path
		if((pageTabs.value.findIndex((e)=>e.path===tab.path))==-1){
			pageTabs.value.push(tab);
		}
	}
	//暴露给父组件的option
	defineExpose({pageTabs,tabAddFun})
	
	//tab变化时向上级传递
	const emit=defineEmits(['tabChangeTrans'])
	const tabChangeTrans=(index)=>{
		emit("tabChangeTrans",index)
	}
</script>

<style>
</style>