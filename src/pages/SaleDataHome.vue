<!--
**************************************
*  名称：睿莱数据统计平台
*  作用：数据显示
*  作者：闫聪洋
**************************************
-->
<template>
	<div>
		<!--右侧内容区-->
		<div class="content-container">
			<div class="grid-content bg-purple-light">
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<div class="content">
							<h1>&nbsp;网站导航</h1>
							<div class="role-statistics">
								<h2>&nbsp;总量统计</h2>
								<el-col class="item-role" :span="6">
									<p>加盟商</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-role" :span="6">
									<p>机构</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-role" :span="6">
									<p>园所</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-role" :span="6">
									<p>服务幼儿</p><br>
									<strong>32132</strong>
								</el-col>
							</div>
							<div class="role-statistics">
								<h2>&nbsp;本周情况</h2>
								<el-col class="item-week" :span="4">
									<p>新增加盟</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-week" :span="4">
									<p>新增机构</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-week" :span="4">
									<p>新增园所</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-week" :span="4">
									<p>新增服务幼儿</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-week" :span="4">
									<p>报告售出</p><br>
									<strong>32132</strong>
								</el-col>
								<el-col class="item-week" :span="4">
									<p>现报告库存</p><br>
									<strong>32132</strong>
								</el-col>
							</div>
							<el-col class="item-higthchart" :span="11" style="margin-right: 20px;">
								<h2>&nbsp;地域分布（按省）</h2>
								<h6>&nbsp;指标：</h6>
								<div class="radio-box">
									<el-radio-group v-model="radio1" size="medium">
										<el-radio-button label="机构"></el-radio-button>
										<el-radio-button label="加盟"></el-radio-button>
										<el-radio-button label="园所"></el-radio-button>
										<el-radio-button label="服务幼儿"></el-radio-button>
										<el-radio-button label="报告售出"></el-radio-button>
									</el-radio-group>
								</div>
								<div id="highchart-map" style="max-width: 800px;height: 420px;clear: both;"></div>
							</el-col>
							<el-col class="item-higthchart" :span="11" style="margin-left: 20px;">
								<h2>&nbsp;趋势图</h2>
								<h6>&nbsp;时间：</h6>
								<div class="radio-box">
									<el-radio-group v-model="radio5" size="medium">
										<el-radio-button label="最近7天"></el-radio-button>
										<el-radio-button label="最近30天"></el-radio-button>
										<el-radio-button label="最近3个月"></el-radio-button>
									</el-radio-group>
								</div>
								<div class="block">
									<el-date-picker class="radio-box time-interval" v-model="value9" type="daterange" unlink-panels placeholder="请选择时间区间">
									</el-date-picker>
								</div>
								<el-checkbox class="radio-box time-interval-check" v-model="checked">选择时间区间</el-checkbox>
								<div class="index-option">
									<h6>&nbsp;指标：</h6>
									<el-select class="radio-box" v-model="value" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
								<div class="hicharts-right">
									<div id="container" style="max-width:600px;height:400px"></div>
								</div>
							</el-col>
						</div>
					</transition>
				</el-col>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'Vue';
	import Highcharts from 'highcharts/highstock';
	import HighchartsMore from 'highcharts/highcharts-more';
	import loadMap from 'highcharts/modules/map';
	import HighchartsDrilldown from 'highcharts/modules/drilldown';
	import Highcharts3D from 'highcharts/highcharts-3d';
	import china from '../assets/js/china'

	HighchartsMore(Highcharts)
	loadMap(Highcharts);
	HighchartsDrilldown(Highcharts);
	Highcharts3D(Highcharts);

	export default {
		data() {
			return {
				
				radio1: '机构',
				radio5: '最近7天',
				value9: '',
				checked: false,
				value: '',
				options: [],

			};
		},
		methods: {

			HichartMap: function() {
				var dataMap = [{
					"name": "北京",
					"value": 8
				}, {
					"name": "天津",
					"value": 15
				}, {
					"name": "河北",
					"value": 74
				}, {
					"name": "山西",
					"value": 45
				}, {
					"name": "内蒙古",
					"value": 73
				}, {
					"name": "辽宁",
					"value": 34
				}, {
					"name": "吉林",
					"value": 94
				}, {
					"name": "黑龙江",
					"value": 52
				}, {
					"name": "上海",
					"value": 8
				}, {
					"name": "江苏",
					"value": 16
				}, {
					"name": "浙江",
					"value": 23
				}, {
					"name": "安徽",
					"value": 98
				}, {
					"name": "福建",
					"value": 27
				}, {
					"name": "江西",
					"value": 49
				}, {
					"name": "山东",
					"value": 29
				}, {
					"name": "河南",
					"value": 11
				}, {
					"name": "湖北",
					"value": 68
				}, {
					"name": "湖南",
					"value": 29
				}, {
					"name": "广东",
					"value": 44
				}, {
					"name": "广西",
					"value": 44
				}, {
					"name": "海南",
					"value": 14
				}, {
					"name": "重庆",
					"value": 31
				}, {
					"name": "四川",
					"value": 5
				}, {
					"name": "贵州",
					"value": 58
				}, {
					"name": "云南",
					"value": 71
				}, {
					"name": "西藏",
					"value": 27
				}, {
					"name": "陕西",
					"value": 17
				}, {
					"name": "甘肃",
					"value": 28
				}, {
					"name": "青海",
					"value": 14
				}, {
					"name": "宁夏",
					"value": 22
				}, {
					"name": "新疆",
					"value": 24
				}, {
					"name": "台湾",
					"value": 65
				}, {
					"name": "香港",
					"value": 36
				}, {
					"name": "澳门",
					"value": 58
				}, {
					"name": "南海诸岛",
					"value": 19
				}, {
					"name": "南海诸岛",
					"value": 29
				}];
				var map = new Highcharts.Map('highchart-map', {
					title: {
						text: '中国地图'
					},
					chart: {
			            height: 420
					},
					credits: {
						enabled: false
					},
					colorAxis: {
						min: 0,
						minColor: 'rgb(255,255,255)',
						maxColor: '#006cee'
					},
					series: [{
						data: dataMap,
						name: '随机数据',
						mapData: china.chinamaps,
						joinBy: 'name' // 根据 name 属性进行关联
					}]
					
				});
			},
			getHicharts: function() {
				var chart = Highcharts.chart('container', {
					chart: {
						height: 340,
						type: 'line'
					},
					credits: {
						enabled: false
					},
					title: {
						text: '指标'
					},
					subtitle: {
						text: null
					},
					yAxis: {
						title: {
							text: null
						}
					},
					legend: {
						align: 'center',
						verticalAlign: 'bottom',
						y: 20,
						layout: 'vertical'
					},
					plotOptions: {
						series: {
							label: {
								connectorAllowed: false
							},
							pointStart: 1
						}
					},
					series: [{
						data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, ],
						name: '服务幼儿'
					}],
					responsive: {
						rules: [{
							condition: {
								maxWidth: 500
							},
							chartOptions: {
								legend: {
									layout: 'horizontal',
									align: 'center',
									verticalAlign: 'bottom'
								}
							}
						}]
					}
				});
			}
		},
		mounted() {
			this.getHicharts();
			this.HichartMap();
		}
	}
</script>
<style type="text/css">
	/*.el-radio-button__orig-radio:checked+.el-radio-button__inner {
		background-color: #da2337 !important;
		border-color: #da2337 !important;
		box-shadow: -1px 0 0 0 #da2337 !important;
	}
	
	.el-checkbox__input.is-checked .el-checkbox__inner {
		background-color: #da2337 !important;
		border-color: #da2337 !important;
	}*/
</style>
<style scoped>
	.content h1 {
		height: 40px;
		line-height: 50px;
	}
	
	.content h1,
	.role-statistics h2,
	.item-higthchart h2 {
		font-size: 14px;
		text-align: left;
		font-weight: 600;
	}
	
	.role-statistics {
		height: 170px;
	}
	
	.role-statistics h2 {
		border-top: 1px solid #dcdcdc;
		padding-top: 15px;
	}
	
	.role-statistics .item-role,
	.role-statistics .item-week {
		margin-top: 20px;
		line-height: 10px;
		float: left;
	}
	
	.item-higthchart {
		border: 1px solid #dcdcdc;
		height: 525px;
		padding: 0 20px;
	}
	
	.item-higthchart h2 {
		padding: 15px 0;
	}
	
	.item-higthchart h6 {
		float: left;
		line-height: 35px;
		clear: both;
	}
	
	.item-higthchart .radio-box {
		float: left;
	}
	
	.index-option {
		margin-top: 65px;
	}
	
	.item-higthchart .time-interval {
		margin-left: 52px;
		margin-bottom: 10px;
	}
	
	.item-higthchart .time-interval-check {
		margin-top: 8px;
		margin-left: 15px;
	}
	
	.item-higthchart .hicharts-right {}
</style>