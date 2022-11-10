<template>
	<div class="index">
		<div class="page-left">
			<div class="dataPanel">
				<el-card class="dataPanel-left" shadow="hover" :body-style="dataPanelLeftStyle">
					<img class="icon" src="../assets/images/index/dataPanel.png" />
					<div class="dataPanel-left-data">
						<div class="dataPanel-left-data-top">
							<el-dropdown>
								<span class="dataPanel-left-data-top-topTitle">
									本日新增用户
									<el-icon class="el-icon--right">
										<Icon name="ep:arrow-down" />
									</el-icon>
								</span>
								<template #dropdown>
									<el-dropdown-menu>
										<el-dropdown-item>本日新增用户</el-dropdown-item>
										<el-dropdown-item>本周新增用户</el-dropdown-item>
										<el-dropdown-item>本月新增用户</el-dropdown-item>
										<el-dropdown-item>本年新增用户</el-dropdown-item>
									</el-dropdown-menu>
								</template>
							</el-dropdown>
							<view class="num">
								123546
							</view>
						</div>
						<el-divider />
						<div class="dataPanel-left-data-bottom">
							<div class="item">
								<span class="title">文章</span>
								<span class="num">288</span>
							</div>
							<div class="item">
								<span class="title">任务</span>
								<span class="num">288</span>
							</div>
							<div class="item">
								<span class="title">流水</span>
								<span class="num">288</span>
							</div>
						</div>
					</div>
				</el-card>
			</div>
			<div class="dataBox">
				<div class="dataBox-left">
					<el-card shadow="hover" :body-style="dataBoxStyle">
						<img src="../assets/images/index/users.png" alt="用户">
						<div class="item">
							<span class="num">288</span>
							<span class="title">总用户</span>
						</div>
					</el-card>
					<el-card shadow="hover" :body-style="dataBoxStyle">
						<div class="item border-right">
							<span class="num">288</span>
							<span class="title">有效用户</span>
						</div>
						<div class="item">
							<span class="num">288</span>
							<span class="title">活跃用户</span>
						</div>
					</el-card>
				</div>
				<div class="dataBox-right">
					<el-card shadow="hover" :body-style="dataBoxStyle">
						<img src="../assets/images/index/purse.png" alt="钱包">
						<div class="item">
							<span class="num">288</span>
							<span class="title">总流水</span>
						</div>
					</el-card>
					<el-card shadow="hover" :body-style="dataBoxStyle">
						<div class="item border-right">
							<span class="num">288</span>
							<span class="title">流水</span>
						</div>
						<div class="item">
							<span class="num">288</span>
							<span class="title">流水</span>
						</div>
					</el-card>
				</div>
			</div>
			<!-- 图表区域 -->
			<div class="gmv">
				<div id="gmv">

				</div>
			</div>
			<div class="dau-dnu">
				<div class="" id="dau-dnu">

				</div>
			</div>
		</div>
		<div class="page-right">
			<div class="inAttesaBox">
				<el-card shadow="hover">
					<template #header>
						<div class="card-header">
							<span style="font-weight: 700;">待处理</span>
						</div>
					</template>
					<view class="inAttesaBox-item">

					</view>
					<view class="inAttesaBox-item">

					</view>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script setup>
	import {
		Column,
		Area
	} from '@antv/g2plot';
	import useSettingsStore from '~/store/modules/settings'
	const settingsStore = useSettingsStore()
	var columnPlot = null
	var areaPlot = null
	const subscribe = settingsStore.$subscribe((mutation, state) => {
		let theme = state.isDark ? 'dark' : 'default'
		columnPlot.update({
			theme
		})
		areaPlot.update({
			theme
		})
	})
	onMounted(() => {
		const data1 = [{
				"year": "1991",
				"value": 3,
				"type": "Lon"
			},
			{
				"year": "1992",
				"value": 4,
				"type": "Lon"
			},
			{
				"year": "1993",
				"value": 3.5,
				"type": "Lon"
			},
			{
				"year": "1994",
				"value": 5,
				"type": "Lon"
			},
			{
				"year": "1995",
				"value": 4.9,
				"type": "Lon"
			}, {
				"year": "1991",
				"value": 3,
				"type": "bar"
			},
			{
				"year": "1992",
				"value": 4,
				"type": "bar"
			},
			{
				"year": "1993",
				"value": 3.5,
				"type": "bar"
			},
			{
				"year": "1994",
				"value": 5,
				"type": "bar"
			},
			{
				"year": "1995",
				"value": 4.9,
				"type": "bar"
			},
			{
				"year": "1995",
				"value": 4.9,
				"type": "bar"
			}
		]
		console.log(data1)
		columnPlot = new Column('gmv', {
			data: data1,
			height: 250,
			isStack: true,
			xField: 'year',
			yField: 'value',
			seriesField: 'type',
			theme: localStorage.getItem('vueuse-color-scheme') == 'dark' ? 'dark' : 'default',
			legend: {
				layout: 'horizontal',
				position: 'top-left',
				title: {
					text: '近7日GMV',
					spacing: 8,
					style: {
						fontSize: 15,
						fontWeight: 700,
						fill: 'rgb(41, 105, 255)'
					}
				}
			}
		});
		columnPlot.render();
		// api.useGet('/os/antfincdn/8elHX%26irfq/stack-column-data.json').then((data) => {

		// });
		//tubiaoer
		const data2 = [{
				"country": "北美",
				"date": 1965,
				"value": 1390.5
			},
			{
				"country": "北美",
				"date": 1966,
				"value": 1469.5
			},
			{
				"country": "北美",
				"date": 2009,
				"value": 2632.5
			},
			{
				"country": "北美",
				"date": 2010,
				"value": 2720.7
			},
			{
				"country": "北美",
				"date": 2011,
				"value": 2722.9
			},
			{
				"country": "北美",
				"date": 2012,
				"value": 2665.1
			},
			{
				"country": "北美",
				"date": 2013,
				"value": 2738.3
			},
			{
				"country": "北美",
				"date": 2014,
				"value": 2766.8
			},
			{
				"country": "北美",
				"date": 2015,
				"value": 2739.7
			},
			{
				"country": "北美",
				"date": 2016,
				"value": 2761.9
			},
			{
				"country": "北美",
				"date": 2017,
				"value": 2772.8
			},



			{
				"country": "中南美",
				"date": 1968,
				"value": 128
			},
			{
				"country": "中南美",
				"date": 1969,
				"value": 134.4
			},
			{
				"country": "中南美",
				"date": 1970,
				"value": 142.2
			},
			{
				"country": "中南美",
				"date": 1971,
				"value": 157.5
			},
			{
				"country": "中南美",
				"date": 1972,
				"value": 169.5
			},
			{
				"country": "中南美",
				"date": 1973,
				"value": 186.3
			},
			{
				"country": "中南美",
				"date": 1974,
				"value": 195.5
			},
			{
				"country": "中南美",
				"date": 1975,
				"value": 198
			},
			{
				"country": "中南美",
				"date": 1976,
				"value": 211.7
			},
			{
				"country": "中南美",
				"date": 1977,
				"value": 223.8
			},
			{
				"country": "中南美",
				"date": 1978,
				"value": 236.5
			}
		]

		areaPlot = new Area('dau-dnu', {
			data: data2,
			height: 250,
			xField: 'date',
			yField: 'value',
			seriesField: 'country',
			theme: localStorage.getItem('vueuse-color-scheme') == 'dark' ? 'dark' : 'default',
			legend: {
				layout: 'horizontal',
				position: 'top-left',
				title: {
					text: '近7日DAU/DNU',
					spacing: 8,
					style: {
						fontSize: 15,
						fontWeight: 700,
						fill: 'rgb(41, 105, 255)'
					}
				}
			}
		});
		areaPlot.render();
		// api.useGet('/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json').then((data) => {

		// });
	})
	const dataPanelLeftStyle = {
		background: 'rgb(41, 105, 255)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
	const dataBoxStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '15px'
	}
	const inAttesaBox = {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '15px'
	}
</script>

<style scoped lang="scss">
	.index {
		display: flex;
	}

	.page-right {
		width: 30%;

		.inAttesaBox {
			width: 100%;
		}
	}

	.page-left {
		width: 70%;
		display: flex;
		flex-wrap: wrap;

		.dataPanel {
			width: 48%;
			margin-bottom: 20px;

			&-left {
				width: 100%;

				.icon {
					width: 130px;
					height: 130px;
				}

				&-data {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					margin-left: 50px;

					&-top {
						display: flex;
						flex-direction: column;

						.num {
							font-size: 24px;
							font-weight: 700;
							color: var(--el-color-white);
							margin-top: 5px;
						}

						&-topTitle {
							cursor: pointer;
							color: var(--el-color-white);
						}
					}

					.el-divider--horizontal {
						margin: 10px 0;
						border: 2px solid rgba(255, 255, 255, 0.12);
					}

					&-bottom {
						width: 100%;
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}

		.dataBox {
			margin: 0 2%;
			width: 48%;
			display: flex;
			margin-bottom: 20px;

			&-left,
			&-right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			&-left {
				margin-right: 4%;

			}

			.item {
				flex: 1;

				.num {
					margin: 0 0 8px 0;
					font-weight: 700;
					font-size: 18px;
					color: var(--el-text-color-primary);
				}
			}

			img {
				width: 36px;
				height: 36px;
			}
		}

		.gmv,
		.dau-dnu {
			width: 48%;
			padding: 20px;
			border-radius: 8px;
			background-color: var(--el-bg-color);
			margin-bottom: 20px;
		}

		.dau-dnu {
			margin-right: 2%;
			margin-left: 2%;
		}
	}
</style>
<style scoped lang="scss">
	.border-right {
		border-right: 1px solid var(--el-border-color);
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;

		.title {
			font-size: 12px;
			color: var(--el-text-color-regular);
		}

		.num {
			margin-top: 5px;
			font-size: 16px;
			color: var(--el-color-white);
		}
	}
</style>

<style scoped>
	@media screen and (max-width:1024px) {
		.index {
			flex-direction: column;
		}

		.page-right,
		.page-left {
			width: 100%;
		}

		.dau-dnu,
		.dataBox {
			margin-left: 4% !important;
			margin-right: 0 !important;
		}
	}

	@media screen and (max-width:820px) {

		.dataPanel,
		.dataBox {
			width: 100% !important;
		}

		.dau-dnu {
			margin-left: 4% !important;
			margin-right: 0 !important;
		}

		.dataBox {
			margin-left: 0 !important;
		}
	}

	@media screen and (max-width:540px) {

		.gmv,
		.dau-dnu {
			width: 100% !important;
		}

		.dau-dnu {
			margin-left: 0 !important;
			margin-right: 0 !important;
		}
	}
</style>
