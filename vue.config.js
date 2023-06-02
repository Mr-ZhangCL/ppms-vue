const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
module.exports={
	devServer:{
		host:"127.0.0.1",
		port:"10082",
		proxy:{
			"/api":{
				target:"http://127.0.0.1:10081/ppms",
				changeOrigin:true,
				pathRewrite:{
					"^/api":""
				}
			}
		}
	}
}
