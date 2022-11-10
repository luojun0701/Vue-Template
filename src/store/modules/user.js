// import api from '@/api'

import useRouteStore from './route'

const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
			nickName:'admin',
			avatarUrl:'',
            permissions: [],
			token:localStorage.getItem('token')
        }),
        getters: {
            isLogin: state => {
				let retn = false
				if (state.token) {
				    retn = true
				}
				return retn
            }
        },
        actions: {
            login(data) {
                return new Promise((resolve, reject) => {
					this.token='sssssssssss'
                    localStorage.setItem('token','sssssssssssssss')
					resolve()
                })
            },
            logout() {
                return new Promise(resolve => {
                    const routeStore = useRouteStore()
                    localStorage.removeItem('token')
                    this.token = ''
                    routeStore.removeRoutes()
                    resolve()
                })
            },
            // 获取我的权限
            getPermissions() {
                return new Promise(resolve => {
                    this.permissions = ['admin']
                    resolve(['admin'])
                })
            },
        }
    }
)

export default useUserStore
