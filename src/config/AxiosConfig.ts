import axios from 'axios'
import router from '../router'

	
const $axios=axios.create({
	baseURL:"/api",
	timeout:10000,
})

//http request 拦截器
$axios.interceptors.request.use(
	config=>{
		if(localStorage.token){
			config.headers.token=localStorage.token;
		}
		return config;
	},
	err=>{
		return Promise.reject(err)
	}
)

//http response 拦截器
$axios.interceptors.response.use(
	response=>{
		if(response.data.errno===999){
			router.replace("/")
			console.log("token过期")
		}
		return response;
	},
	error=>{
		return Promise.reject(error)
	}
)

export default $axios