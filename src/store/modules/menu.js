import useRouteStore from './route'
//筛选过滤掉不需要的路由
function filterAllMenus(routes) {
	//过滤第一级
	let filterData=routes.filter(item=>!item.meta.hidden)
	//过滤所有子级最多三级
	for(let i in filterData){
		filterData[i].children=filterData[i].children.filter(route=>!route.meta.hidden)
		for(let j in filterData[i].children){
			if(filterData[i].children[j]?.children){
				filterData[i].children[j].children=filterData[i].children[j].children.filter(route=>!route.meta.hidden)
			}
		}
	}
	//过滤所有父级中没有子集的数据
	for(let i=filterData.length-1;i>=0;i--){ 
		if(filterData[i].children.length==0){
			filterData.splice(i,1)
		}
		for(let j=filterData[i].children.length-1;j>=0;j--){
			if(filterData[i].children[j].children?.length==0){
				filterData[i].children.splice(j,1)
			}
		}
	}
	return filterData
}
const useMenuStore = defineStore(
	// 唯一ID
	'menu', {
		state: () => ({
			menus: [],
			actived: 0
		}),
		getters: {
			// 完整导航数据
			allMenus() {
				const routeStore = useRouteStore()
				let menus = filterAllMenus(routeStore.routes)
				return menus
			}
		},
		actions: {

		}
	}
)

export default useMenuStore
