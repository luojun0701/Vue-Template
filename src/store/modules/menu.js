import useRouteStore from './route'

const useMenuStore = defineStore(
    // 唯一ID
    'menu',
    {
        state: () => ({
            menus: [],
            actived: 0
        }),
        getters: {
            // 完整导航数据
            allMenus() {
				const routeStore = useRouteStore()
                let menus = routeStore.routes
                return menus
            }
        },
        actions: {

        }
    }
)

export default useMenuStore
