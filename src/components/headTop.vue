<!--
**************************************
*  名称：导航头组件
*  作用：导航栏 退出登录 修改密码
*  作者：闫聪洋
**************************************
-->
<template>
	<div>
		<el-row class="head-nav">
			<el-col :span="5" class="logo-box">
				<img src="../../static/images/logo.png">
				<b>
					睿莱数据统计平台
				</b>
			</el-col>
			<el-col :span="15">
				<el-menu :default-active="$route.path" router  mode="horizontal"  >
					<el-menu-item class="headTopMenu" v-for="(route,index) in routes" @click="firstParam(index)" :key="route.path" :index="route.path" :class="$route.path==route.path?'is-active':''">{{route.name}}
					</el-menu-item>
				</el-menu>
					
			</el-col>
			<el-col :span="4">
				<el-dropdown class="userinfo ">
					<span class="el-dropdown-link userinfo-inner">
						<img src="../../static/images/user-icon.png" />
					    管理员 <i class="el-icon-arrow-down"></i>
					  </span>
					<el-dropdown-menu slot="dropdown" >
						
						<el-dropdown-item >
						</el-dropdown-item>
						<el-dropdown-item>
							<span v-on:click="logout">
									退出登录
								</span>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>

		<!--<el-dialog title="修改密码" :visible.sync="dialogFormVisible" size="tiny">
			<el-form :model="passForm" label-width="70px" :rules="passFormRules" ref="passForm">
				<el-form-item label="旧密码" prop="oldPassword">
					<el-input v-model="passForm.oldPassword" type="password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPassword">
					<el-input v-model="passForm.newPassword" type="password" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-row>
					<el-col :span="5" :offset="5">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
					</el-col>
					<el-col :span="8">
						<el-button type="danger" @click.native="editSubmit">提 交</el-button>
					</el-col>
				</el-row>
			</div>
		</el-dialog>-->
	</div>
</template>
<script>
	import Vue from 'Vue'
	import content from '../utils/context'
	import router from '../router'
	import pub from '../assets/js/public.js'
	export default {
		data() {
			return {				
				dialogFormVisible: false,
				passForm: {
					oldPassword: '',
					newPassword: '',
				},
				index: 0,
				passFormRules: {
					oldPassword: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					newPassword: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
				routes: [
					{ path: '/main/Home_SaleData', name: '体侧销售分析', },
					{ path: '/main/Home_WeChat', name: '公众号', },
					{ path: '/main/TeachingPlan', name: '课程教程', }		
				]
				
			}
		},
		methods: {			
			//退出登录
			logout: function() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {}).then(() => {
					_this.$http.get('auth/logout');
					content.clear();
					_this.$router.push('/');
				})
			},
			//向asideNav传递当前导航的index值
			getIndex:function(){
				var hash = window.location.hash;				
				if(hash == '#/main/Home_SaleData'){
					this.index = 0;
				}else if(hash == '#/main/Home_WeChat'){
					this.index = 1;
				}else{
					this.index = 2;
				}
				var menu = document.getElementsByClassName('headTopMenu');
				var _this = this;
				setTimeout(function(){
					pub.$emit('index',_this.index);
				},0)			
			},
			firstParam:function(index){
				pub.$emit('index',index);
			}
//			editSubmit: function() {
//				this.$refs.passForm.validate((valid) => {
//					if(valid) {
//						let para = {
//							OldPassword: this.passForm.oldPassword,
//							NewPassword: this.passForm.newPassword
//						}
//						this.$http.put('/password', para).then(response => {
//							if(response.status == 200) {
//								this.$message({
//									message: '修改成功',
//									type: 'success'
//								});
//								this.dialogFormVisible = false;
//								var _this = this;
//								_this.$http.get('auth/logout');
//								content.clear();
//								_this.$router.push('/');
//							}
//						}).catch(() => {
//							this.$message({
//								message: '请检查输入是否正确',
//								type: 'error'
//							});
//						})
//					}
//				});
//			},

		},
		mounted(){
			this.getIndex();
		}
		
	}
</script>

<style scoped>
	
	.head-nav {
		width: 100%;
		height: 70px;
		background: #e3272e;
		position: fixed!important;
		top: 0;
		left: 0;
		z-index: 999;
		text-align: center;
		
	}
	
	.logo-box {
		padding-left: 60px;
		padding-top: 20px;
	}
	
	.logo-box img {
		width: 50px;
		height: 35px;
		float: left;
	}
	
	.logo-box b {
		float: left;
		color: #FFFFFF;
		font-size: 16px;
		padding-top: 8px;
		padding-left: 10px;
	}
	
	.el-menu {
		background: #e3272e!important;
		
	}
	.el-menu--horizontal{
		border-bottom: 0px solid #FFFFFF;
	}
	.el-menu li {
		height: 70px;
		width: 150px;
		line-height: 70px;
		font-size: 16px;
		color: #FFFFFF!important;	
	}
	
	.el-menu-item {
		color: #ffffff;
	}
	
	.el-menu-item.is-active {		
		color: #fff;
	}
	.el-menu--horizontal>.el-menu-item.is-active {
     border-bottom: 4px solid #ffffff; 
}
	.el-menu li a {
		text-decoration: none;
		display: block;
		height: 70px;
	}
	
	.el-menu li:hover {
		background: #e4282d;
		border-bottom: 0px solid transparent;
		color: #FFFFFF;
	}
	.is-active{
		border-bottom: 0px solid transparent;
		color: #FFFFFF;
	}
	.userinfo {
		cursor: pointer;
		line-height: 70px;
		color: #FFFFFF;
		font-size: 16px;
	}
	
	.userinfo span {
		height: 60px;
		display: block;
	}
	
	.el-dropdown-menu {
		margin-top: -5px;
	}
</style>