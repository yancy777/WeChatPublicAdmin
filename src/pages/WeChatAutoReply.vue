<!-- 
**************************************
 *名称：公众号——自动回复 
 *作用：自动回复操作 
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
							<h1>&nbsp;自动回复</h1>
							<div class="content-bg">
								<el-tabs type="border-card" class="content-tabs">
									<el-tab-pane> <span slot="label">收到消息回复</span>
										<el-input v-model="receiveTextarea" type="textarea" :rows="20" placeholder="请输入回复消息内容" class="textarea-box">
										</el-input><br><br>
										<div class="btn-box">
											<el-button v-on:click="receiveReplyMessage(receiveTextarea)">保 存</el-button>
											<el-button v-on:click="deleteMessage">删除回复</el-button>
										</div><br>
									</el-tab-pane>
									<el-tab-pane label="被关注回复">
										<el-input type="textarea" v-model="followTextarea" :rows="20" placeholder="请输入被关注回复消息内容" class="textarea-box">
										</el-input><br><br>
										<div class="btn-box">
											<el-button v-on:click="followReplyMessage(followTextarea)">保 存</el-button>
											<el-button v-on:click="deleteMessage"> 删除回复</el-button>
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
	import Vue from 'Vue';
	export default {
		data() {
			return {
				receiveTextarea: "",
				followTextarea: ""
			};
		},
		methods: {
			deleteMessage: function() {
				this.receiveTextarea = "";
				this.followTextarea = "";
			},
			receiveReplyMessage: function(mess) {
				console.log(mess);
				this.$http
					.post("/wx/informationContent", {
						PassiveResponseContent: mess
					})
					.then(res => {
						debugger
						if(res.data) {
							this.$message.success({
								message: "收到消息回复成功",
								type: 'success'
							})
						} else {
							this.$message.error("请求数据失败")
						}
					})
			},
			followReplyMessage: function(mess) {
				this.$http
					.post("/wx/informationContent", {					
							AttentionResponseContent: mess				
					})
					.then(res => {
						debugger
						if(res.data) {
							this.$message.success({
								message: " 被关注消息回复成功",
								type: 'success'
							})
						} else {
							this.$message.error("请求数据失败")
						}
					})
			}
		},
		mounted() {}
	}
</script>
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
		width: 80%;
		margin-left: 50px;
	}
	
	.btn-box {
		margin-left: 100px;
	}
</style>