//账户类型选项
const options=[
	{
		code:"ACCOUNT_TYPE",
		label:"银行卡",
		value:"01"
	},{
		code:"ACCOUNT_TYPE",
		label:"支付宝",
		value:"02"
	},{
		code:"ACCOUNT_TYPE",
		label:"微信",
		value:"03"
	},	
]

class Option{
	label:string;
	value:string
	
	constructor(label:string,value:string){
		this.label=label
		this.value=value
	}
}

export const getOptionsByCode=(code:string)=>{
	const selects:Array<Option>=[]
	options.forEach((value)=>{
		if(code===value.code){
			selects.push(new Option(value.label,value.value))
		}
	})
	return selects
}

export const getNameByCodeAndValue=(code:string,codeValue:string)=>{
	let name:string=""
	options.forEach(value=>{
		if(code===value.code){
			if(codeValue===value.value){
				name=value.label
			}
		}
	})
	return name
}
