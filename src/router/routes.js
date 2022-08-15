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
			title: '首页',
			icon: 'ep:home-filled',
			breadcrumb:false
		}, 
		children: [{
			path: '/index',
			name: 'index',
			component: () => import('~/views/index.vue'),
			meta: {
				title: '首页',
				sidebar:false
			}
		}]
	},{
	path: '/shop',
	component: Layout,
	redirect: '/shop/index',
	meta: {
		title: '商户中心',
		icon: 'ep:shop'
	},
	children: [{
		path: '/shop/index',
		name: 'shopIndex',
		component: () => import('~/views/shop/index.vue'),
		meta: {
			title: '商户列表',
			auth:'admin'
		}
	},{
		path: '/shop/gl',
		name: 'shopgl',
		redirect: '/shop/shopgl/add',
		meta: {
			title: '商户管理',
		},
		children: [{
			path: '/shop/shopgl/add',
			name: 'shopadd',
			component: () => import('~/views/index.vue'),
			meta: {
				title: '新增商户',
			}
		}]
	}]
}]

export {
	constantRoutes,
	asyncRoutes
}
