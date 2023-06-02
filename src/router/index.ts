import {createRouter,createWebHashHistory} from 'vue-router'
import PpmsHome from '../components/PpmsHome.vue'
import PpmsLogin from '../components/PpmsLogin.vue'

import TabAccountMaintain from '@/components/TabAccountMaintain.vue'
import DevelopingTip from '@/components/DevelopingTip.vue'
import TabHome from '@/components/TabHome.vue'

const routerHistory=createWebHashHistory()

const router=createRouter({
	history: routerHistory,
	routes:[
		{
			path:"/home",
			component:PpmsHome,
			meta:{
				requireAuth:true
			},
			children:[
				{
					path:"/home",
					component:TabHome
				},
				{
					path:"/accountMaintain",
					component:TabAccountMaintain
				},
				{
					path:"/developingTip",
					component:DevelopingTip
				}
			]
		},
		{
			path:"/login",
			component:PpmsLogin
		},
		{
			path:"/",
			redirect:"/login"
		}
	]
})

//token校验
router.beforeEach((to,from,next)=>{
	if(to.meta.requireAuth){
		if(localStorage.token){
			console.log("token校验通过");
			next();
		}else{
			console.log("token校验失败");
			next({
				path:"/",
				query:{redirect:to.fullPath}
			})
		}
	}else{
		next();
	}
})

export default router