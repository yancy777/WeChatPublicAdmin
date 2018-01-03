export default {
	address: [{
		value: "610100",
		label: "西安市",
	}, {
		value: "621000",
		label: "庆阳市",
	}, {
		value: "220100",
		label: "长春市",
	}, {
		value: "610400",
		label: "咸阳市",
	}, {
		value: "421000",
		label: "荆州市",
	}, {
		value: "510100",
		label: "成都市",
	}, {
		value: "610300",
		label: "宝鸡市",
	}, {
		value: "420200",
		label: "黄石市",
	}, {
		value: "430200",
		label: "株洲市",
	}, {
		value: "510800",
		label: "广元市",
	}, {
		value: "650200",
		label: "克拉玛依市",
	}, ],
	addressCode: {
		"西安市": "610100",
		"庆阳市": "621000",
		"长春市": "220100",
		"咸阳市": "610400",
		"成都市": "510100",
		"株洲市": "430200",
		"广元市": "510800",
		"黄石市": "420200",
		"荆州市": "421000",
		"宝鸡市": "610300",
		"克拉玛依市": "650200"
	},
	weightCode: {
		"肥胖": "1",
		"瘦弱": "-1",
	},
	classType: {
		"大班": "0",
		"中班": "1",
		"小班": "2",
	},
	classType2: {
		"0": "大班",
		"1": "中班",
		"2": "小班",
	},
	actionDevelopment: [{
		value: '110000',
		label: '动作发展',
		children: [{
			value: '110100',
			label: '移动性动作技能',
			children: [{
				value: '110101',
				label: '走',
			}, {
				value: '110102',
				label: '跑',
			}, {
				value: '110103',
				label: '单双脚跳',
			}, {
				value: '110104',
				label: '爬行',
			}, {
				value: '110105',
				label: '滑步',
			}],
		}, {
			value: '110200',
			label: '稳定性动作技能',
			children: [{
				value: '110201',
				label: '平衡',
			}, {
				value: '110202',
				label: '转体',
			}, {
				value: '110203',
				label: '弓步',
			}, {
				value: '110204',
				label: '翻转',
			}, {
				value: '110205',
				label: '支撑',
			}, {
				value: '110206',
				label: '提拉',
			}, {
				value: '110207',
				label: '下蹲',
			}],
		}, {
			value: '110300',
			label: '操作性动作技能',
			children: [{
				value: '110301',
				label: '操控物体一起移动',
			}]
		}],
	}, {
		value: '120000',
		label: '感知觉发展',
		children: [{
			value: '120100',
			label: '按指令运动',
			children: [{
				value: '120101',
				label: '听口令做动作',
			}]
		}, {
			value: '120200',
			label: '感受表达平稳的节拍',
			children: [{
				value: '120201',
				label: '拍球',
			}, {
				value: '120202',
				label: '跳绳',
			}, {
				value: '120203',
				label: '体操',
			}, {
				value: '120204',
				label: '韵律操',
			}]
		}],
	}, {
		value: '130000',
		label: '运动兴趣',
		children: [{
			value: '130100',
			label: '各类集体游戏,合作游戏'
		}, {
			value: '130200',
			label: '集体协作运动项目兴趣启蒙'
		}, {
			value: '130300',
			label: '亲子运动项目'
		}, {
			value: '130400',
			label: '运动游园活动'
		}]
	}, {
		value: '140000',
		label: '体能基础',
		children: [{
				value: '140100',
				label: '灵敏反应性',
				children: [{
					value: '140101',
					label: '听信号做动作'
				}, {
					value: '140102',
					label: '折返跑'
				}, {
					value: '140103',
					label: '躲闪跑',
				}, {
					value: '140104',
					label: '变向跑'
				}]
			}, {
				value: '140200',
				label: '柔韧伸展性',
				children: [{
					value: '140201',
					label: '静态拉伸'
				}, {
					value: '140202',
					label: '动态拉伸'
				}]
			}, {
				value: '140300',
				label: '平衡稳定性',
				children: [{
					value: '140301',
					label: '单脚'
				}, {
					value: '140302',
					label: '双脚平衡'
				}, {
					value: '140303',
					label: '着地稳定性'
				}, {
					value: '140304',
					label: '失重稳定性'
				}, {
					value: '140305',
					label: '翻转稳定性'
				}, {
					value: '140306',
					label: '支撑稳定性'
				}]
			}, {
				value: '140400',
				label: '心肺耐力',
				children: [{
					value: '140401',
					label: '远足活动'
				}, {
					value: '140402',
					label: '追逐耐久跑'
				}, {
					value: '140403',
					label: '循环体能'
				}]
			},
			{
				value: '140500',
				label: '协调灵活性',
				children: [{
					value: '140501',
					label: '跑跳跨结合'
				}, {
					value: '140502',
					label: '球类操作练习'
				}, {
					value: '140503',
					label: '啦啦操'
				}, {
					value: '140504',
					label: '基本体操'
				}]
			}
		]
	}]
}