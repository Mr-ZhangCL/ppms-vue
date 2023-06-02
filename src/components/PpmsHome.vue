<template>
	<el-row :gutter="5" style="width: 100%;">
		<el-col :span="3">
			<CommonLeftMenu ref="leftMenuOptions"></CommonLeftMenu>
		</el-col>
		<el-col :span="21">
			<CommonTopMenu :userNm="userNm"></CommonTopMenu>
			<CommonPageTab ref="pageTabOptions" @tabChangeTrans="leftMenuCurTabChange"></CommonPageTab>
		</el-col>
		
	</el-row>
</template>

<script lang="ts" setup>
	import CommonLeftMenu from './CommonLeftMenu'
	import CommonPageTab from '@/components/CommonPageTab.vue'
	import CommonTopMenu from '././CommonTopMenu'
	import {useRoute,onBeforeRouteUpdate} from 'vue-router'
	import {ref} from 'vue'
	
	const userNm=ref(useRoute().query.userNm)
	
	let pageTabOptions=ref(null);
	let leftMenuOptions=ref(null);
	
	onBeforeRouteUpdate(()=>{
		const tab={
			title:leftMenuOptions.value.curTab.title,
			path:leftMenuOptions.value.curTab.path
		}
		pageTabOptions.value.tabAddFun(tab)
	})
	
		
	const leftMenuCurTabChange=(index)=>{
		leftMenuOptions.value.curTabChange(index)
	}
	
</script>

<style>
	#app{
		margin: 0px;
	}
</style>