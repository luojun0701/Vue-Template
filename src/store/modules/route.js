import useUserStore from './user'

function hasPermission(permissions, route) {
    let isAuth = false
    if (route.meta && route.meta.auth) {
        isAuth = permissions.some(auth => {
            if (typeof route.meta.auth == 'string') {
                return route.meta.auth === auth
            } else {
                return route.meta.auth.some(routeAuth => {
                    return routeAuth === auth
                })
            }
        })
        isAuth = true
    }
    return isAuth
}

function filterAsyncRoutes(routes, permissions) {
    const res = []
    routes.forEach(route => {
        let tmpRoute = util.deepClone(route)
		//auth undefined代表任何人可访问 
        if (tmpRoute.meta.auth===undefined||hasPermission(permissions, tmpRoute)) {
            if (tmpRoute.children) {
                tmpRoute.children = filterAsyncRoutes(tmpRoute.children, permissions)
                tmpRoute.children.length && res.push(tmpRoute)
            } else {
                res.push(tmpRoute)
            }
        }
    })
    return res
} 
// 将多层嵌套路由处理成两层，保留顶层和最子层路由，中间层级将被拍平
function getAsyncRoutes(routes) {
    routes.forEach((route,i) => {
		let breadcrumb=[{
		    path: route.path,
		    title: route.meta.title,
			hide: !route.meta.breadcrumb && route.meta.breadcrumb === false
		}]
		route.children=asyncRoutesRecursive(route.children,breadcrumb)
    })
    return routes
}
function asyncRoutesRecursive(routes, breadcrumb) {
    let res=[]
    routes.forEach(route => {
		let tmpRoute = util.deepClone(route)
		// 处理面包屑导航
		let tmpBreadcrumb = util.deepClone(breadcrumb)
        if (tmpRoute.children) {
			tmpBreadcrumb.push({
			    path: tmpRoute.path,
			    title: tmpRoute.meta.title,
				hide: !route.meta.breadcrumb && route.meta.breadcrumb === false
			})
            tmpRoute.children=asyncRoutesRecursive(tmpRoute.children,tmpBreadcrumb)
			res.push(tmpRoute)
        } else {
            tmpBreadcrumb.push({
                path: tmpRoute.path,
                title: tmpRoute.meta.title,
				hide: !route.meta.breadcrumb && route.meta.breadcrumb === false
            })
            tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
            res.push(tmpRoute)
        }
    })
    return res
} 

const useRouteStore = defineStore(
    // 唯一ID
    'route',
    {
        state: () => ({
            isGenerate: false,
            routes: [],
            currentRemoveRoutes: []
        }),
        getters: {
            // 获取生成的路由数据
           getRoutes: state => {
                let routes = [] 
                // 生成带有面包屑的路由数据
				routes.push(...util.deepClone(getAsyncRoutes(state.routes)))
                return routes
            },
        },
        actions: {
            // 根据权限动态生成路由
            generateRoutesAtFront(asyncRoutes) {
                // eslint-disable-next-line no-async-promise-executor
                return new Promise(async resolve => {
                    const userStore = useUserStore()
					// 根据权限对路由数据进行筛选过滤
					 const permissions = await userStore.getPermissions()
                    let accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions)
                    // 设置 routes 数据 
                    this.isGenerate = true
                    this.routes = accessedRoutes.filter(item => item.children.length != 0)
                    resolve()
                })
            },
            // 记录 accessRoutes 路由，用于登出时删除路由
            setCurrentRemoveRoutes(routes) {
                this.currentRemoveRoutes = routes
            },
            // 清空路由
            removeRoutes() {
                this.isGenerate = false
                this.routes = []
                this.currentRemoveRoutes.forEach(removeRoute => {
                    removeRoute()
                })
                this.currentRemoveRoutes = []
            }
        }
    }
)

export default useRouteStore
