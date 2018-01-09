<!-- 
**************************************
 *名称：课程模板
 *作用：编辑创建课程模板 
 *作者：闫聪洋 
 ************************************** 
-->
<template>
	<div>
		<!--右侧内容区-->
		<div class="content">
			<div class="grid-content bg-purple-light">
				<h1>&nbsp;教程模板</h1>
				<div class="content-bg">
					<div class="content-tabs">
						<el-form :model="templateInput">
							<el-row>
								<el-col :span="12">
									<div class="content-box-info">
										<h2 style="margin-top: -40px;">&nbsp;基本信息</h2>
										<el-form-item label="课程名称">
											<el-input v-model="templateInput.Name" class="label-width" placeholder="请填写标题"></el-input>
										</el-form-item>
										<el-form-item label="课程时间">
											<el-input v-model="templateInput.Duration" class="label-width" placeholder="请填写标题"></el-input>
										</el-form-item>
										<el-form-item label="年级">
											<el-radio-group v-model="templateInput.Grade" size="medium">
												<el-radio-button label="大班" value="0"></el-radio-button>
												<el-radio-button label="中班" value="1"></el-radio-button>
												<el-radio-button label="小班" value="2"></el-radio-button>
											</el-radio-group>
										</el-form-item>
										<el-form-item label="动作标签">
											<!-- <el-cascader v-for="type in templateInput.MotorType" class="motor-label" :options="options" v-model="selectedOptions" @change="handleChange">
											</el-cascader> -->
											<el-cascader v-for="type in templateInput.MotorType" class="motor-label" :options="options" :value="typeFormat(type)" @change="handleChange">
											</el-cascader>
											<br>
											<el-button type="primary" plain v-on:click="addLabel()">增加</el-button>
											<el-button type="danger" plain v-on:click="deleteLabel()">删除</el-button>
										</el-form-item>
										<el-form-item label="教学目标">
											<el-input v-model="templateInput.Purpose" type="textarea" :rows="6" placeholder="请输入内容" class="textarea-box" @change="supRes1(templateInput.Purpose)">
											</el-input>
										</el-form-item>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="content-box-info">
										<h2 style="margin-top: -40px;">&nbsp;预览</h2>
										<h3>&nbsp;教学目标</h3>
										<p v-html="exampleHtml1"></p>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<div class="content-box-info" style="height: 420px;">
										<h2 style="margin-top: -20px;">&nbsp;教学准备</h2>
										<el-form-item label="器材准备">
											<el-input v-model="templateInput.Equipment" type="textarea" :rows="6" placeholder="请输入内容" class="textarea-box" @change="supRes2(templateInput.Equipment)">
											</el-input>
										</el-form-item>
										<el-form-item label="经验准备">
											<el-input v-model="templateInput.Experience" type="textarea" :rows="6" placeholder="请输入内容" class="textarea-box" @change="supRes3(templateInput.Experience)">
											</el-input>
										</el-form-item>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="content-box-info" style="height: 420px;">
										<h2 style="margin-top: -20px;">&nbsp;预览</h2>
										<h3>&nbsp;器材准备</h3>
										<p v-html="exampleHtml2"></p><br><br>
										<h3>&nbsp;经验准备</h3>
										<p v-html="exampleHtml3"></p>
									</div>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="12">
									<div class="content-box-info" style="height: 1240px;">
										<h2 style="margin-top: -20px;">&nbsp;教学过程</h2>
										<el-form-item label="准备部分">
											<el-input @change="supRes4(templateInput.PrepareContent)" v-model="templateInput.PrepareContent" type="textarea" :rows="6" placeholder="请输入内容" class="textarea-box">
											</el-input>
										</el-form-item>
										<el-form-item label="配图">
											<div class="img-src-box">
												<img v-bind:src="templateInput.prepareImgs" style="width:25%;height:25%">
											</div>
											<label class="ui_button ui_button_primary code-text code-text-btn" for="prepare" style="margin-left: 80px"><a style="color: #de2533;">上传图片</a></label>
											<label class="ui_button ui_button_primary code-text code-text-btn"><a style="color: #de2533;" v-on:click="deleteImg('prepare','prepare')" >删 除</a></label>
											<input type="file" @change="uploadAndSubmit('prepare','prepare')" id="prepare" name="prepare" style="position: absolute; clip: rect(0 0 0 0);" />
										</el-form-item>

										<el-form-item label="基本部分">
											<el-input @change="supRes5(templateInput.BaseContent)" v-model="templateInput.BaseContent" type="textarea" :rows="6" placeholder="请输入内容" class="textarea-box">
											</el-input>
										</el-form-item>
										<el-form-item label="组形式织">
											<div class="img-src-box">
												<img v-bind:src="templateInput.shapeImgs" style="width:25%;height:25%">
											</div>
											<label class="ui_button ui_button_primary code-text code-text-btn" for="shape" style="margin-left: 80px"><a style="color: #de2533;"  >上传图片</a></label>
											<label class="ui_button ui_button_primary code-text code-text-btn"><a style="color: #de2533;" v-on:click="deleteImg('shape','shape')" >删 除</a>
												
											</label><input type="file" @change="uploadAndSubmit('shape','shape')" id="shape" name="shape" style="position: absolute; clip: rect(0 0 0 0);" />
										</el-form-item>
										<el-form-item label="场地布置">
											<div class="img-src-box">
												<img v-bind:src="templateInput.spaceImgs" style="width:25%;height:25%">
											</div>
											<label class="ui_button ui_button_primary code-text code-text-btn" for="space" style="margin-left: 80px"><a style="color: #de2533;"  >上传图片</a></label>
											<label class="ui_button ui_button_primary code-text code-text-btn"><a style="color: #de2533;" v-on:click="deleteImg('space','space')" >删 除</a></label>
											<input type="file" @change="uploadAndSubmit('space','space')" id="space" name="space" style="position: absolute; clip: rect(0 0 0 0);" />
										</el-form-item>
										<el-form-item label="结束部分">
											<el-input @change="supRes6(templateInput.EndContent)" v-model="templateInput.EndContent" type="textarea" :rows="6" placeholder="请输入内容" class="textarea-box">
											</el-input>
										</el-form-item>
										<el-form-item label="配图">
											<div class="img-src-box">
												<img v-bind:src="templateInput.endImgs" style="width:25%;height:25%">
											</div>
											<label class="ui_button ui_button_primary code-text code-text-btn" for="end" style="margin-left: 80px;"><a style="color: #de2533;" >上传图片</a></label>
											<label class="ui_button ui_button_primary code-text code-text-btn"><a style="color: #de2533;" v-on:click="deleteImg('end','end')" >删 除</a></label>
											<input type="file" @change="uploadAndSubmit('end','end')" id="end" name="end" style="position: absolute; clip: rect(0 0 0 0);" />
										</el-form-item>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="content-box-info" style="height: 1240px;">
										<h2 style="margin-top: -20px;">&nbsp;预览</h2>
										<h3>&nbsp;准备部分</h3>
										<p v-html="exampleHtml4"></p><br><br><br>
										<h3>&nbsp;基本部分</h3>
										<p v-html="exampleHtml5"></p><br><br><br><br><br><br><br><br><br>
										<h3>&nbsp;结束部分</h3>
										<p v-html="exampleHtml6"></p>
									</div>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<div class="content-box-info" style="height: 260px;">
										<h2 style="margin-top: -20px;">&nbsp;教学目标</h2>
										<el-form-item label="教学延伸">
											<el-input @change="supRes7(templateInput.Extend)" v-model="templateInput.Extend" type="textarea" :rows="6" placeholder="请输入内容" class="textarea-box">
											</el-input>
										</el-form-item>
									</div>
								</el-col>
								<el-col :span="12">
									<div class="content-box-info" style="height: 260px;">
										<h2 style="margin-top: -20px;">&nbsp;预览 </h2>
										<h3>&nbsp;教学延伸</h3>
										<p v-html="exampleHtml7"></p>
									</div>
								</el-col>
							</el-row>
							<br><br>
							<div class="btn-box">
								<!--发送清空刷新-->
								<el-button v-if="btnUpdate==true" type="primary" v-on:click="addTemplate()">保存并添加下一个</el-button>
								<el-button v-else type="primary" v-on:click="updataTemplate()">保存并添加下一个</el-button>
								<!--发送返回列表-->
								<el-button v-if="btnUpdate==true" v-on:click="saveAddReturn()">保存并返回</el-button>
								<el-button v-else v-on:click="saveUpReturn()">保存并返回</el-button>
							</div><br>

						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'Vue';
	import util from '../assets/js/commons'
	import config from '../assets/js/config'
	import router from "../router";
	export default {
		data() {
			return {
				templateInput: {
					Name: "",
					Duration: "",
					Purpose: "",
					Equipment: "",
					Experience: "",
					Extend: "",
					PrepareContent: "",
					BaseContent: "",
					EndContent: "",
					Grade: "大班",
					MotorType: [""],
					SaceImg: "",
					ShapeImg: "",
					PrepareImg: "",
					EndImg: "",
					spaceImgs: "",
					shapeImgs: "",
					prepareImgs: "",
					endImgs: "",
				},
				options: config.actionDevelopment,
				selectedOptions: ['110000','110100','110101'],
				value: '',
				exampleHtml1: "",
				exampleHtml2: "",
				exampleHtml3: "",
				exampleHtml4: "",
				exampleHtml5: "",
				exampleHtml6: "",
				exampleHtml7: "",
				btnUpdate: "",
			};
		},
		filters: {
			formatClassType2: config.classType2,

		},
		methods: {
			handleChange(label) {
				debugger;
				for(var index in this.templateInput.MotorType){
					var type = this.templateInput.MotorType[index];
					if(type == ""){
						this.templateInput.MotorType[index] =  "" + label[label.length - 1];
					}
				}
			},
			supRes1: function(val) {
				let result = util.formatRepstr(val);
				this.exampleHtml1 = result.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},
			supRes2: function(val) {
				let result = util.formatRepstr(val);
				this.exampleHtml2 = result.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},
			supRes3: function(val) {
				let result = util.formatRepstr(val);
				this.exampleHtml3 = result.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},
			supRes4: function(val) {
				let result = util.formatRepstr(val);
				this.exampleHtml4 = result.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},
			supRes5: function(val) {
				let result = util.formatRepstr(val);
				this.exampleHtml5 = result.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},
			supRes6: function(val) {
				let result = util.formatRepstr(val);
				this.exampleHtml6 = result.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},
			supRes7: function(val) {
				let result = util.formatRepstr(val);
				this.exampleHtml7 = result.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},

			addTemplate: function(type) {
				let templateDate = this.templateInput;
				templateDate.Grade = config.classType[templateDate.Grade];
				console.log(this.templateInput);
				this.$http
					.post("/course/create", templateDate)
					.then(res => {
						debugger
						if(res.data) {
							this.$message.success({
								message: "模板保存成功",
								type: 'success'
							})
							this.templateInput = {
								Name: "",
								Duration: "",
								Purpose: "",
								Equipment: "",
								Experience: "",
								Extend: "",
								PrepareContent: "",
								BaseContent: "",
								EndContent: "",
								Grade: "大班",
								MotorType: "",
								SaceImg: "",
								ShapeImg: "",
								PrepareImg: "",
								EndImg: "",
							}
							if(type !== null) {
								router.push({
									path: "/main/TeachingPlan"
								});
							}
						} else {
							this.$message.error("模板保存失败")
						}
					})
			},
			editTemplate: function() {
				this.templateInput = JSON.parse(localStorage.getItem("editTemplateDate"));
				this.templateInput.Grade = config.classType2[this.templateInput.Grade];
				this.templateInput.MotorType = eval(this.templateInput.MotorType);

				
				//				this.selectedOptions=[mun1+"0000",mun2+"00",motor];
				console.log(this.selectedOptions);
				debugger;
				this.templateInput.prepareImgs =this.aliImg(this.templateInput.PrepareImg);
				this.templateInput.shapeImgs = this.aliImg(this.templateInput.ShapeImg);
				this.templateInput.spaceImgs = this.aliImg(this.templateInput.SpaceImg);
				this.templateInput.endImgs = this.aliImg(this.templateInput.EndImg);

				let result1 = util.formatRepstr(this.templateInput.Purpose);
				let result2 = util.formatRepstr(this.templateInput.Equipment);
				let result3 = util.formatRepstr(this.templateInput.Experience);
				let result4 = util.formatRepstr(this.templateInput.PrepareContent);
				let result5 = util.formatRepstr(this.templateInput.BaseContent);
				let result6 = util.formatRepstr(this.templateInput.EndContent);
				let result7 = util.formatRepstr(this.templateInput.Extend);
				this.exampleHtml1 = result1.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
				this.exampleHtml2 = result2.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
				this.exampleHtml3 = result3.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
				this.exampleHtml4 = result4.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
				this.exampleHtml5 = result5.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
				this.exampleHtml6 = result6.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
				this.exampleHtml7 = result7.replace(/\n|\r\n/g, '<br/>').replace(" ", "&nbsp;");
			},
			aliImg:function(imgName){
				var imgUrl = "";
				if(imgName != "" && imgName != null){
					imgUrl = "http://ruilai-course.oss-cn-qingdao.aliyuncs.com/"+imgName;
				}
				return imgUrl;
			},
			updataTemplate: function(type) {

				let templateDate = this.templateInput;
				templateDate.Grade = config.classType[templateDate.Grade];
				this.$http
					.post("/course/updata", templateDate)
					.then(res => {
						debugger
						if(res.data) {
							this.$message.success({
								message: "模板保存成功",
								type: 'success'
							})
							if(type !== null) {
								router.push({
									path: "/main/TeachingPlan"
								});
							}
						} else {
							this.$message.error("模板保存失败")
						}
					})
			},
			uploadAndSubmit(up_file, fileId) {
				var thisObject = this;
				var file = document.getElementById(fileId).files[0];
				var storeAs = "course_" + file.name;
				var client = new OSS.Wrapper({
					region: 'oss-cn-qingdao',
					accessKeyId: 'LTAIIzT2QdWuKJLT',
					accessKeySecret: 'ndEcrH4AzjTxLoQtYHRemcPwTCM3wW',
					bucket: 'ruilai-course',
				});
				client.multipartUpload(storeAs, file).then(function(result) {
					if(result.res.status == 200) {
						if(up_file == "prepare") {
							thisObject.templateInput.prepareImgs = 'http://ruilai-course.oss-cn-qingdao.aliyuncs.com/' + storeAs;
							debugger;
							thisObject.templateInput.PrepareImg = storeAs;
						}
						if(up_file == "shape") {
							thisObject.templateInput.shapeImgs = 'http://ruilai-course.oss-cn-qingdao.aliyuncs.com/' + storeAs;
							thisObject.templateInput.ShapeImg = storeAs;
						}
						if(up_file == "space") {
							thisObject.templateInput.spaceImgs = 'http://ruilai-course.oss-cn-qingdao.aliyuncs.com/' + storeAs;
							thisObject.templateInput.SpaceImg = storeAs;
						}
						if(up_file == "end") {
							thisObject.templateInput.endImgs = 'http://ruilai-course.oss-cn-qingdao.aliyuncs.com/' + storeAs;
							thisObject.templateInput.EndImg = storeAs;
						}
					} else {
						alert("上传失败");
					}
				}).catch(function(err) {
					console.log(err);
				});
			},
			deleteImg(up_file, fileId) {
				if(up_file == "prepare") {
					this.templateInput.prepareImgs = "";
					this.templateInput.PrepareImg = "";
					this.$message.success({
						message: "删除成功",
						type: 'success'
					})
				}
				if(up_file == "shape") {
					this.templateInput.shapeImgs = "";
					this.templateInput.ShapeImg = "";
					this.$message.success({
						message: "删除成功",
						type: 'success'
					})
				}
				if(up_file == "space") {
					this.templateInput.spaceImgs = "";
					this.templateInput.SpaceImg = "";
					this.$message.success({
						message: "删除成功",
						type: 'success'
					})
				}
				if(up_file == "end") {
					this.templateInput.endImgs = "";
					this.templateInput.EndImg = "";
					this.$message.success({
						message: "删除成功",
						type: 'success'
					})
				}
			},
			saveUpReturn: function() {
				this.updataTemplate("back");

			},
			saveAddReturn: function() {
				this.addTemplate("back");

			},
			addLabel: function(){
				this.templateInput.MotorType.push("");
			},
			deleteLabel: function(){
				if(this.templateInput.MotorType.length > 1){
					this.templateInput.MotorType.pop();
				}
			},
			typeFormat: function(type){
				var selectedOption;
				let motor = "" + type;
				let mun1 = motor.substring(0, 2);
				let mun2 = motor.substring(0, 4);
				let mun3 = motor.substring(5, 6);
				if(mun3 === "00") {
					selectedOption = [mun1 + "0000", motor];
				} else {
					selectedOption = [mun1 + "0000", mun2 + "00", motor];
				}
				return selectedOption;
			}
		},

		mounted() {
			let query = this.$route.query;
			this.btnUpdate = true;
			if(query.Type === "1") {
				this.btnUpdate = false
				this.editTemplate()
			}
		}

	}
</script>
<style>
	.el-input__icon {
		display: none!important;
	}
	
	.code-text-btn {
		width: 100px;
		margin: 0 10px;
	}
	
	.code-text-btn a:hover {
		border-bottom: 1px solid #de2533;
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
	
	.textarea-box {
		width: 60%;
		margin-left: 0px;
	}
	
	.label-width {
		width: 250px;
		text-align: center;
	}
	
	.content-box-info {
		width: 95%;
		height: auto;
		background: #ffffff;
		margin-top: 50px;
	}
	
	.content-tabs h2 {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		text-align: left;
		border-bottom: 1px solid #dcdcdc;
		margin-bottom: 20px;
	}
	
	.preview-target {
		background: #ffffff;
		width: 95%;
		border: 1px solid #dcdcdc;
	}
	
	.upload-demo {
		width: 40%;
		margin-left: 100px;
	}
	
	.content-box-info p {
		margin-left: 30px;
		margin-right: 30px;
		word-wrap: break-word;
		word-break: normal;
	}

	.motor-label{
		width: 300px;
	}
</style>