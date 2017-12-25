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
							<h1>&nbsp;二维码管理</h1>
							<div class="content-bg">
								<div class="content-add">
									<el-input v-model="addInput" placeholder="请输入内容"></el-input>
									<el-button @click="addQRcode">创建</el-button>
								</div>
								<el-table :data="tableData3" border class="table-box" >
									<el-table-column prop="CreateTime" :formatter="formatBirthday" label="创建时间" >
									</el-table-column>
									<el-table-column prop="StatisticsName" label="场景名称" >
									</el-table-column>
									<el-table-column prop="SweepCodeCount" label="扫码人数">
									</el-table-column>
									<el-table-column  label="下载二维码">
										<template slot-scope="scope"> 
       										 <el-button type="text" @click="exportQRcode(scope.row)">下载</el-button>
    								  </template>
									</el-table-column>
								</el-table>
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
	import utils from "../assets/js/commons";
	export default {
		data() {
			return {			
				addInput:"",
				tableData3: []
			};
		},
		methods: {
			formatBirthday: utils.formatBirthday,
			addQRcode: function() {				
				if (this.addInput) {
					this.$http
					.post("/wx/createCode", {					
							StatisticsName : this.addInput					
					})
					.then(res => {
						this.qrCodeLis()
					})
				} else{
					this.$message.error('请填写二维码名称')
				}
				
				
			},
			qrCodeLis: function() {
				this.$http
					.get("/wx/qrCodeList", {
						params: {}
					})
					.then(res => {
						if(res.data){
							this.tableData3=res.data.Results;
							console.log(res);
						}else{
							this.$message.error('请求数据失败')
						}
					})					
			},
			//下载二维码
			exportQRcode: function(row) {	
				window.open("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+row.Ticket);
//				location.href = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket="+row.Ticket";
//				location.href = process.env.API_ROOT + "/files/template/幼儿园体测数据导入模板.xlsx?ForDownload=true";
			},
		},
		mounted() {
			this.qrCodeLis()
		}
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
	
	.content-add {
		width: 500px;
		float: right;
		margin-bottom: 20px;
	}
	
	.content-add .el-input {
		width: 277px;
	}
	
	.table-box {
		width: 97%;
		margin-left: 20px;
	}
</style>