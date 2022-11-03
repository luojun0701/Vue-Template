const Layout = () => import('~/layout/index.vue')
// 固定路由（默认路由）
let constantRoutes = [
		{
		path: '/login',
		name: 'login',
		component: () => import('~/views/login.vue'),
		meta: {
			title: '登录'
		}
	},
	{
		path: '/:all(.*)*',
		name: 'notFound',
		component: () => import('~/views/404.vue'),
		meta: {
			title: '找不到页面'
		}
	}
]

//动态路由 (需要权限的路由)
let asyncRoutes = [{
		path: '/',
		redirect: '/index',
		component: Layout,
		meta: {
			title: '仪表盘',
			icon: 'ant-design:dashboard-filled',
			breadcrumb:false
		}, 
		children: [{
			path: '/index',
			name: 'index',
			component: () => import('~/views/index.vue'),
			meta: {
				title: '仪表盘',
				sidebar:false
			}
		}]
	},{
	path: '/user',
	component: Layout,
	redirect: '/user/index',
	meta: {
		title: '用户管理',
		icon: 'bxs:user',
		breadcrumb:false
	},
	children: [{
		path: '/user/index',
		name: 'userIndex',
		component: () => import('~/views/user/index.vue'),
		meta: {
			title: '用户管理',
			auth:'admin',
			sidebar:false
		}
	}]
},{
		path: '/',
		redirect: '/index',
		component: Layout,
		meta: {
			title: '文章发布',
			icon: 'mdi:microsoft-dynamics-365',
			breadcrumb:false
		}, 
		children: [{
			path: '/index',
			name: 'index',
			component: () => import('~/views/index.vue'),
			meta: {
				title: '文章发布',
				sidebar:false
			}
		}]
	}]

export {
	constantRoutes,
	asyncRoutes
}
