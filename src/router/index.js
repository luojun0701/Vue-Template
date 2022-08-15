import useUserStore from '~/store/modules/user'
import useMenuStore from '~/store/modules/menu'
import useRouteStore from '~/store/modules/route'

// 路由相关数据
import { constantRoutes, asyncRoutes  } from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

router.beforeEach(async(to, from, next) => {
    const userStore = useUserStore()
    const menuStore = useMenuStore()
    const routeStore = useRouteStore()
	//设置标题
	document.title=to.meta.title	
    // 是否已登录
    if (userStore.isLogin) {
        // 是否已根据权限动态生成并挂载路由
        if (routeStore.isGenerate) {
            if (to.path == '/login') {
                next({
                    path: '/index',
                    replace: true
                })
            } else {
            	next() 
            }
        } else {
			//筛选权限路由数据
            await routeStore.generateRoutesAtFront(asyncRoutes)
            let removeRoutes = []
			//添加到路由
            routeStore.getRoutes.forEach(route => {
                removeRoutes.push(router.addRoute(route))
            })
            // 记录的 accessRoutes 路由数据，在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
            routeStore.setCurrentRemoveRoutes(removeRoutes)
            next({
                path: to.fullPath,
                query: to.query,
                replace: true
            })
        }
    } else {
        if (to.name != 'login') {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    }
})

export default router
