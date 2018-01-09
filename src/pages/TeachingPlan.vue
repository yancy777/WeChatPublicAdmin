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
							<h1>&nbsp;教程课程</h1>
							<div class="content-bg">
								<div class="class-type ">
									年级：
									<el-radio-group v-model="classType" size="medium" @change="filterListClass">
										<el-radio-button label="全部" value="00"></el-radio-button>
										<el-radio-button label="大班" value="0"></el-radio-button>
										<el-radio-button label="中班" value="1"></el-radio-button>
										<el-radio-button label="小班" value="2"></el-radio-button>
									</el-radio-group>
									<div class="content-add">
										<el-input v-model="filter" placeholder="关键字搜索" ></el-input>
										<el-button @click="skipTeachingTemplate()" ><i class="el-icon-plus">添加课程</i></el-button>
									</div>
								</div>
								<el-row>
									<div class="table-box">
										<b-table class="el-table"  hover show-empty :items="items" :fields="fields" :current-page="currentPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" empty-filtered-text='没有相关信息' empty-text='没有孩子信息' @filtered="onFiltered">
											<template slot="CreateTime" scope="row">{{row.item | formatBirthday}}</template>
											<template slot="EditTime" scope="row">{{row.item | formatBirthday}}</template>
											<template slot="Grade" scope="row">{{row.item | formatGender}}</template>formatMotorType
											<template slot="MotorType" scope="row">{{row.item | formatMotorType}}</template>
											<template slot="operation" scope="row">
												<el-button type="success" size="small" class="btn-css-green" @click="handleEdit(row.item)">编 辑</el-button>
												<el-button type="primary" size="small" class="btn-css-green" @click="handleDel(row.item)">删 除</el-button>
											</template>
										</b-table>
									</div>
								</el-row>
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
	import router from "../router";
//	import config from "../assets/js/config";
	export default {
		data() {
			return {
				items: [],
				classType: "全部",
				fields: {
					Name: { label: '课程名', sortable: false},
					Grade: { label: '年级', sortable: true},
					MotorType: { label: '教学内容' ,sortable: true},
					CreateTime: { label: '创建时间', sortable: true},
					EditTime: { label: '修改时间', },
					operation: { label: '操作' }
				},
				currentPage: 1,
				sortBy: null,
				sortDesc: false,
				filter: null,
				modalDetails: { index: '', data: '' },
			};
		},
		filters: {
			formatBirthday: utils.formatBirthday,
			formatGender:utils.formatGender,
			formatMotorType:utils.formatMotorType
		},
		methods: {
			filterListClass(value){
				if(value==="全部"){
					this.filter=null;
					this.teachingPlan();
				}else{
					this.filter=value
				}
			},
			onFiltered(filteredItems) {
				this.totalRows = filteredItems.length;
				this.currentPage = 1;
			},
			skipTeachingTemplate: function() {
				router.push({
					path: "/main/TeachingTemplate"
				});
			},			
			teachingPlan: function() {
				this.$http
					.get("/course/list",{
						params:{
							Cancel:0
						}
					 }
					)
					.then(res => {
						if(res.data) {
							this.items = res.data.Results;
							console.log(this.items);
						} else {
							this.$message.error('请求数据失败')
						}
					})
			},
			//编辑
			handleEdit: function(row) {
				localStorage.editTemplateDate=JSON.stringify(row);
				router.push({
					path: "/main/TeachingTemplate?Type=1"
				});
			},
			//删除
			handleDel: function(row) {
				this.$confirm('确认删除课程模板：' + row.Name, '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						Id: row.Id					
					};
					this.$http.post('/course/delete', para).then(response => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.teachingPlan();
					})
				}).catch(() => {});
			},
		},
		mounted() {
			this.teachingPlan()
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
	
	.class-type {
		margin-left: 20px;
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