// import api from '@/api'

import useRouteStore from './route'

const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            permissions: []
        }),
        getters: {
            isLogin: state => {
                return true
            }
        },
        actions: {
            login(data) {
                return new Promise((resolve, reject) => {
                    
                })
            },
            logout() {
                return new Promise(resolve => {
                    const routeStore = useRouteStore()
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    localStorage.removeItem('failure_time')
                    this.account = ''
                    this.token = ''
                    this.failure_time = ''
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
