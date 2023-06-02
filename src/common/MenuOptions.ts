class menu{
	index:string
	name:string
	parentMenu:string
	icon:string
	childs:Array<menu>
	
	constructor(index:string,name:string,parentMenu:string,icon:string){
		this.name=name
		this.parentMenu=parentMenu
		this.index=index
		this.childs=[]
		this.icon=icon
	}
}

const menus=[
	{
		index:"analysis",
		name:"统计分析",
		parentMenu:"",
		childs:[],
		icon:"Histogram"
	},
	{
		index:"assetAnalysis",
		name:"资产分析",
		parentMenu:"analysis",
		childs:[],
		icon:""
	},
	{
		index:"positionAnalysis",
		name:"持仓分析",
		parentMenu:"assetAnalysis",
		childs:[],
		icon:""
	},
	{
		index:"flowAnalysis",
		name:"流水分析",
		parentMenu:"assetAnalysis",
		childs:[],
		icon:""
	},
	{
		index:"debtAnalysis",
		name:"负债分析",
		parentMenu:"analysis",
		childs:[],
		icon:""
	},
	{
		index:"loanAnalysis",
		name:"贷款分析",
		parentMenu:"debtAnalysis",
		childs:[],
		icon:""
	},
	
	
	
	{
		index:"assetManage",
		name:"资产管理",
		parentMenu:"",
		childs:[],
		icon:"Coin"
	},
	{
		index:"accountManage",
		name:"账户管理",
		parentMenu:"assetManage",
		childs:[],
		icon:""
	},
	{
		index:"/accountMaintain",
		name:"账户维护",
		parentMenu:"accountManage",
		childs:[],
		icon:""
	},
	{
		index:"/accountBalanceMaintain",
		name:"账户余额维护",
		parentMenu:"accountManage",
		childs:[],
		icon:""
	},
	{
		index:"/accountFlowMaintain",
		name:"账户流水维护",
		parentMenu:"accountManage",
		childs:[],
		icon:""
	},
	{
		index:"fixedAsset",
		name:"固定资产",
		parentMenu:"assetManage",
		childs:[],
		icon:""
	},
	{
		index:"fixedAssetMaintain",
		name:"固定资产维护",
		parentMenu:"fixedAsset",
		childs:[],
		icon:""
	},
	{
		index:"/specialAsset",
		name:"特殊资产",
		parentMenu:"assetManage",
		childs:[],
		icon:""
	},
	{
		index:"/specialAssetMaintain",
		name:"特殊资产维护",
		parentMenu:"/specialAsset",
		childs:[],
		icon:""
	},
	
	
	
	
	{
		index:"/debtManage",
		name:"负债管理",
		parentMenu:"",
		childs:[],
		icon:"CreditCard"
	},
	{
		index:"/loanManage",
		name:"欠款管理",
		parentMenu:"/debtManage",
		childs:[],
		icon:""
	},
]


const getChildMenus=(m:Array<menu>)=>{
	m.forEach(item=>{
		menus.forEach(value=>{
			if(item.index===value.parentMenu)
				item.childs.push(value)
		})
		if(item.childs&&item.childs.length>0){
			getChildMenus(item.childs)
		}
	})
	return m
}
export const allMenus:Array<menu>=getChildMenus(menus.filter(item=>item.parentMenu===""))
export {menus}