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
							<h1>&nbsp;模板消息历史</h1>
							<div class="content-bg">
								<el-table :data="tableData" border class="table-box">
									<el-table-column prop="CreateTime" :formatter="formatBirthday" label="日期">
									</el-table-column>
									<el-table-column prop="TemplateType" label="模板">
									</el-table-column>
									<el-table-column prop="Area" label="地区">
									</el-table-column>
									<el-table-column prop="PQLProperty" label="体质属性">
									</el-table-column>
									<el-table-column prop="UserCount" label="用户数">
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
				tableData: [],
			};
		},
		methods: {
			formatBirthday: utils.formatBirthday,
			historyDate: function() {
				this.$http
					.get("/wx/mp/template/history", {
						params: {}
					})
					.then(res => {
						if(res.data){
							this.tableData=res.data.Results;
							console.log(res);
						}else{
							this.$message.error('请求数据失败')
						}
					})
					
			}
		},
		mounted() {
			this.historyDate()
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
		min-height: 1000px;
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
		/*margin-bottom: 20px;*/
	}
</style>