<template>
	<el-menu router
	class="el-menu-vertical-demo"
	default-active="/home"
	@select="menuSelect">
		<el-icon size="70"><Menu/></el-icon>
		<h3>Personal Property</h3>
		<br/><br/>
		<el-menu-item index="/home">
			<template #title>
				<el-icon><HomeFilled/></el-icon>
				<span>Home</span>
			</template>
		</el-menu-item>
		<el-sub-menu v-for="item in allMenus"
			:key="item.index" :index="item.index">
			<template #title>
				<el-icon >
					<Histogram v-if="item.icon=='Histogram'"/>
					<Coin v-if="item.icon=='Coin'"/>
					<CreditCard v-if="item.icon=='CreditCard'"/>
				</el-icon>
				<span>{{item.name}}</span>
			</template>
			<template v-for="childItem in item.childs" >
				<template  v-if="childItem.childs.length>0">
					<el-menu-item-group
						:key="childItem.index" 
						:title="childItem.name">
						<el-menu-item v-for="grandChildItem in childItem.childs"
							:key="grandChildItem.index" :index="grandChildItem.index">
							{{grandChildItem.name}}
						</el-menu-item>
					</el-menu-item-group>
				</template>
				<template  v-if="childItem.childs.length===0">
					<el-menu-item 
						:key="childItem.index" :index="childItem.index">
						{{childItem.name}}
					</el-menu-item>
				</template>
			</template>
			
		</el-sub-menu>
	</el-menu>
</template>

<script lang="ts" setup>
	import {
		Histogram,
		Menu,Coin,CreditCard,HomeFilled
		} from '@element-plus/icons-vue'
	
	import {allMenus,menus} from '@/common/MenuOptions'
	import { ref } from 'vue';
	
	const curTab=ref({
		path:"",
		title:""
	})
		
	const menuSelect=(index)=>{
		curTabChange(index)
	}
	
	const curTabChange=(index)=>{
		curTab.value.path=index
		if(menus.filter(item=>item.index===index)[0]){
			curTab.value.title=menus.filter(item=>item.index===index)[0].name
		}else{
			curTab.value.title='主页'
		}
	}
	
	
	defineExpose({curTab,curTabChange})
</script>

<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		/* width: 200px; */
		min-height: 200px;
	}
</style>