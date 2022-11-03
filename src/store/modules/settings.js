const useMenuStore = defineStore(
	// 唯一ID
	'settings', {
		state: () => ({
			// 侧边栏是否收起（用于记录 pc 模式下最后的状态）
			collapseLastStatus: false,
			isCollapse: false,
			mode: 'pc',
			showNavTabs:false,
			fullName:'萝卜桃后台系统',
			abbreviation:'萝卜桃'
		}),
		actions: {
			// 设置访问模式
			setMode(width) {
				// 先判断 UA 是否为移动端设备（手机&平板）
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator
					.userAgent)) {
					this.mode = 'mobile'
				} else {
					// 如果为桌面设备，再根据页面宽度判断是否需要切换为移动端展示
					if (width < 992) {
						this.mode = 'mobile'
					} else {
						this.mode = 'pc'
					}
				}
			}, 
			// 切换侧边栏导航展开/收起
			toggleSidebarCollapse() {
			    this.isCollapse = !this.isCollapse
			    if (this.mode == 'pc') { 
			        this.collapseLastStatus = !this.collapseLastStatus
			    }
			},
		}
	}
)

export default useMenuStore
