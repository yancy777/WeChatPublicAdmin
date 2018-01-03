<!-- 
**************************************
 *名称：公众号——模板信息 
 *作用：模板信息操作 
 *作者：闫聪洋 
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
							<h1>&nbsp;发送模板消息</h1>
							<div class="content-bg">
								<el-tabs type="border-card" v-model="editableTabsValue" class="content-tabs">
									<el-tab-pane label="选择目标用户" name="1">
										<p><span class="required-red">*</span>地区<span class="required-gray">（可多选）</span></p><br>
										<el-checkbox-group class="checkbox-with" v-model="checkList">
											<el-checkbox v-for="item in areaDate" :label="item.label" :key="item.value"></el-checkbox>
										</el-checkbox-group><br>
										<p><span class="required-red">*</span>体质属性<span class="required-gray">（可多选）</span></p><br>
										<div class="checkbox-with">
											<el-checkbox-group v-model="checkboxGroup" size="medium">
												<el-checkbox-button label="肥胖" value="1">肥胖</el-checkbox-button>
												<el-checkbox-button label="瘦弱" value="-1">瘦弱</el-checkbox-button>
											</el-checkbox-group>
											<p></p>
										</div><br><br>
										<div class="btn-box">
											<el-button @click.native="stepOne">下一步</el-button>
										</div><br>
									</el-tab-pane>
									<el-tab-pane label="选择模板并填写内容" name="2" disabled>
										<p><span class="required-red">*</span> 选择模板</p>
										<div>
											<select class="el-select-box" v-model="selected" @change="supRes(selected)">
												<option v-for="item in options" :value="item">{{item.title}}</option>
											</select>
											<div class="tempalte-text">
												<!--<p>{{selected}}</p>-->
												<p v-html="exampleHtml"></p>
											</div>
										</div>
										<el-form :model="editInput" class="editInput">
											<p class="clear-both"><span class="required-red">*</span> 编写内容</p>
											<el-form-item label="跳转url">
												<el-input v-model="editInput.urls" class="label-width" placeholder="不填则默认不跳转,(必须加http开头)"></el-input>
											</el-form-item>
											<el-form-item label="标题">
												<el-input v-model="editInput.first" class="label-width" placeholder="请填写标题"></el-input>
											</el-form-item>
											<el-form-item v-for="item in optionsInput" :label=item.name>
												<el-input v-model="editInput[item.keyWorlds]" class="label-width" placeholder="请填写内容"></el-input>
											</el-form-item>
											<el-form-item label="备 注 ">
												<el-input v-model="editInput.remark" class="label-width" placeholder="请输入备注"></el-input>
											</el-form-item>
										</el-form>
										<br><br>
										<div class="btn-box">
											<el-button @click.native="stepTwo">下一步</el-button>
										</div><br>
									</el-tab-pane>
									<el-tab-pane label="确认发送" name="3" disabled>
										<div>
											<p><span class="required-red">*</span> 目标用户</p>
											<div class="tempalte-text">
												<p>{{checkList | formatStepOne}}<br>{{checkboxGroup |formatStepOne}}<br>总人数：{{countUser}}</p>
											</div>
											<p class="clear-both"><span class="required-red">*</span> 设置人数 </p>
											<el-input class="sendCount-width" v-model="sendCount" placeholder="请输入发送人数" @change="checkCountUser"></el-input>
											<span class="required-red">{{erroMess}}</span>
											<br><br>
										</div>
										<p class="clear-both"><span class="required-red">*</span> 发送内容</p>
										<div class="tempalte-text">
											<!--<p>{{parentTemplate}}</p>-->
											<p v-html="exampleHtml"></p>
										</div><br><br>
										<div class="btn-box clear-both">
											<el-button @click.native="stepThree">确定发送</el-button>
										</div><br>
									</el-tab-pane>
								</el-tabs>
							</div>
						</div>
					</transition>
				</el-col>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'Vue'
	import config from '../assets/js/config'
	let _ = require("underscore")
	export default {
		data() {
			return {
				checkList: [],
				checkboxGroup: [],
				options: [],
				optionsInput: [],
				selected: '',
				areaDate: config.address,
				editInput: {
					urls:"",
					first:"",
					remark:""
				},
				addressCodeArr: [],
				checkListArr: [],
				countUser: "",
				parentTemplate: {},
				editableTabsValue: "1",
				sendCount: "",
				erroMess: "",
				exampleHtml: ""
			};
		},
		filters: {
			formatStepOne: function(str) {
				return str.join(",").replace(/\[\]\"/ig, "")
			},
		},
		methods: {
//			formatRepstr: function(str) {
//				if(str) {
//					let exampleHtml = str.split(/\r\n/ig)
//					return exampleHtml
//				}
//			},

			checkCountUser: function() {
				if(this.sendCount > this.countUser) {
					this.erroMess = "输入不能大于总人数"
				} else {
					this.erroMess = ""
				}
			},
			supRes: function(val) {
				var str = val.content,
					substrArry = str.split("\n"),
					keyWorldArr = [],
					keyWorldItem,
					strName,
					keyWorld,
					exampleHtmlFillter = (val.example).replace(/\n\n/ig, "\n");
				this.exampleHtml = "{{" + exampleHtmlFillter.replace(/\n/ig, "}}<br/>{{") + "}}";
				for(let i in substrArry) {
					if(i > 0 && i < substrArry.length - 1) {
						if(substrArry[i]) {
							strName = ((substrArry[i].match(/(\S*)：/g))[0]).replace(/：/g, "");
							keyWorld = (((substrArry[i].match(/\{(\S*)\./g))[0]).replace(/{{/g, "")).replace(".", "");
							keyWorldItem = {
								name: strName,
								keyWorlds: keyWorld,
							}
							this.editInput[keyWorld]="";
							keyWorldArr.push(keyWorldItem);
						}
					}
				}
				this.optionsInput = keyWorldArr;

			},
			stepOne: function(row) {
				let checkList = this.checkList;
				let checkboxGroup = this.checkboxGroup;
				if(checkList.length === 0) {
					this.$message.error('请选择地区')
				} else if(checkboxGroup.length === 0) {
					this.$message.error('请选择体质属性')
				} else {
					for(let i in checkList) {
						this.addressCodeArr.push((config.addressCode[checkList[i]]).substring(0, 4));
					};
					for(let j in this.checkboxGroup) {
						this.checkListArr.push(config.weightCode[this.checkboxGroup[j]]);
					};
					this.$http
						.post("/wx/mp/template/sendUserCount", {
							RegionCodeArr: this.addressCodeArr,
							LabelArr: this.checkListArr
						})
						.then(res => {
							if(res) {
								this.countUser = res.data;
								this.editableTabsValue = "2";
							} else {
								this.$message.error('请求数据失败')
							}
						})
				}

			},
			stepTwo: function() {
				this.editableTabsValue = "3";
			},
			stepThree: function() {
				debugger;
				var dataTemplate = {},
					editInputJson = this.editInput,
					checkboxGroup = this.checkboxGroup,
					templatId = this.selected.template_id,
					checkList = this.checkList,
					title = this.selected.title,
					sendCount;
				if(this.sendCount === "") {
					sendCount = this.countUser;
				} else {
					sendCount = this.sendCount
				}

				for(let keys in editInputJson) {
					if(keys != "urls") {
						let vals = {};
						vals["value"] = editInputJson[keys];
						vals["color"] = "#171717";
						dataTemplate[keys] = vals;
					}
				}
				this.parentTemplate = {
					"condition": {
						"ConditionName": checkboxGroup.toString(),
						"RegionCode": this.addressCodeArr,
						"Labels": this.checkListArr,
						"Area": checkList.toString(),
						"TemplateName": title,
						"SendCount": sendCount
					},
					"template": {
						"template_id": templatId,
						"url": editInputJson.urls,
						"data": dataTemplate
					}
				}
				this.$http
					.post("/wx/mp/template/send",
						this.parentTemplate
					)
					.then(res => {
						this.$message.success({
							message: "发送成功",
							type: 'success'
						})
					})

				debugger;
				console.log(this.selected);
				console.log(dataTemplate);
				console.log(this.parentTemplate)
			},
			templateDate: function() {
				this.$http
					.get("/wx/mp/template/list", {
						params: {}
					})
					.then(res => {
						if(res.data) {
							this.options = res.data.template_list;
							console.log(res.data);
						} else {
							this.$message.error('请求数据失败')
						}
					})
			}

		},
		mounted() {
			this.templateDate()
		}
	}
</script>
<style>
	.el-form-item__label {
		width: 90px!important;
	}
</style>
<style scoped>
	.content h1 {
		height: 50px;
		line-height: 50px;
		font-size: 14px;
		text-align: left;
		font-weight: 600;
		border-bottom: 1px solid #dcdcdc;
	}
	
	.content-bg {
		min-height: 1200px;
		background: #ececec;
		margin-left: -20px;
		margin-top: -10px;
		padding-top: 20px;
	}
	
	.content-tabs {
		width: 97%;
		margin-left: 20px;
	}
	
	.btn-box {
		margin-left: 45%;
	}
	
	.required-red {
		color: #da2337
	}
	
	.required-gray {
		color: #888888
	}
	
	.el-select-box {
		margin-left: 50px;
		height: 30px;
		border: 1px solid #d8dce5;
	}
	
	.checkbox-with {
		width: 90%;
		padding-left: 50px;
	}
	
	.el-checkbox {
		margin-right: 50px;
	}
	
	.el-checkbox+.el-checkbox {
		margin-left: 0px;
	}
	
	.el-checkbox-button {
		padding-right: 50px;
	}
	
	.input-with {
		width: 200px;
	}
	
	.el-select-box {
		width: 200px;
		padding-left: 20px;
		float: left;
		margin-top: 25px;
		margin-right: 70px;
		margin-bottom: 25px;
	}
	
	.clear-both {
		clear: both;
	}
	
	.tempalte-text {
		width: 40%;
		margin-top: 10px;
		float: left;
		margin-bottom: 10px;
		padding-left: 50px;
	}
	
	.el-input__icon .el-icon-caret-top {
		display: none!important;
	}
	
	.label-width {
		width: 250px;
		text-align: center;
	}
	
	.sendCount-width {
		width: 150px;
	}
</style>