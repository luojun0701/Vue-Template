// import api from '@/api'

import useRouteStore from './route'

const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            account: localStorage.account || '',
            token: localStorage.token || '',
            failure_time: localStorage.failure_time || '',
            permissions: []
        }),
        getters: {
            isLogin: state => {
                // let retn = false
                // if (state.token) {
                //     if (new Date().getTime() < state.failure_time * 1000) {
                //         retn = true
                //     }
                // }
                return true
            }
        },
        actions: {
            login(data) {
                return new Promise((resolve, reject) => {
                    // 通过 mock 进行登录
                    // api.post('member/login', data, {
                    //     baseURL: '/mock/'
                    // }).then(res => {
                    //     localStorage.setItem('account', res.data.account)
                    //     localStorage.setItem('token', res.data.token)
                    //     localStorage.setItem('failure_time', res.data.failure_time)
                    //     this.account = res.data.account
                    //     this.token = res.data.token
                    //     this.failure_time = res.data.failure_time
                    //     resolve()
                    // }).catch(error => {
                    //     reject(error)
                    // })
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
                    // 通过 mock 获取权限
                    this.permissions = ['admin']
                    resolve(['admin'])
                })
            },
        }
    }
)

export default useUserStore
