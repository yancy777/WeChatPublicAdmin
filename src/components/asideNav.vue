<!--
**************************************
*  名称：侧导航组件
*  作用：二级导航，显示\隐藏
*  作者：闫聪洋
**************************************
-->
<template>
	<div>
		<div v-if ='whatNavigation==0'>
			<transition name="slide-fade-in">
				<div class="aside-nav" v-if="showIn" @click="openNavigation()">
					<div class="aside-nav-title" @click="showIn = !showIn"><img src="/static/images/navigation-open.png" alt="headTop.vue" /></div>
				</div>
			</transition>
			<div class="aside-nav-in" @click="closeNavigation()" v-if="isTrue">
				<div class="aside-nav-title" @click="showIn = !showIn"><img src="/static/images/navigation-close.png" alt="" /></div>
			</div>
			<div>
				<el-menu default-active="Home_SaleData" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#ffffff">
				 	<el-menu-item index="Home_SaleData">
				 	  <i class="el-icon-menu"></i>
				 	  <span slot="title">总览</span>
				 	</el-menu-item>
				</el-menu>
			</div>
		</div>
		<div v-if ='whatNavigation==1'>
			<transition name="slide-fade-in">
				<div class="aside-nav" v-if="showIn" @click="openNavigation()">
					<div class="aside-nav-title" @click="showIn = !showIn"><img src="/static/images/navigation-open.png" alt="headTop.vue" /></div>
				</div>
			</transition>
			<div class="aside-nav-in" @click="closeNavigation()" v-if="isTrue">
				<div class="aside-nav-title" @click="showIn = !showIn"><img src="/static/images/navigation-close.png" alt="" /></div>
			</div>

			<div>
				<el-menu default-active="Home_WeChat" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#ffffff" :router=true>
				  <el-menu-item index="Home_WeChat">
				    <i class="el-icon-menu"></i>
				    <span slot="title">首页</span>
				  </el-menu-item>
				  <el-menu-item index="CustomMenu_WeChat">
				    <i class="el-icon-goods"></i>
				    <span slot="title">自定义菜单</span>
				  </el-menu-item>
				  <el-submenu index="3">
				    <template slot="title">
				      <i class="el-icon-location"></i>
				      <span slot="title">模板信息</span>
				    </template>
				    <el-menu-item-group>
				        <el-menu-item index="TemplateInfo_WeChat">发送模板消息</el-menu-item>
				        <el-menu-item index="TempalteHistory_WeChat">模板消息历史</el-menu-item>
				    </el-menu-item-group>
				  </el-submenu>			  
				  <el-menu-item index="AutoReply_WeChat">
				    <i class="el-icon-edit"></i>
				    <span slot="title">自动回复</span>
				  </el-menu-item>
				  <el-menu-item index="QRcode_WeChat">
				    <i class="el-icon-picture"></i>
				    <span slot="title">二维码管理</span>
				  </el-menu-item>
				</el-menu>
			</div>
		</div>
		<div v-if ='whatNavigation==2'>
			<transition name="slide-fade-in">
				<div class="aside-nav" v-if="showIn" @click="openNavigation()">
					<div class="aside-nav-title" @click="showIn = !showIn"><img src="/static/images/navigation-open.png" alt="headTop.vue" /></div>
				</div>
			</transition>
			<div class="aside-nav-in" @click="closeNavigation()" v-if="isTrue">
				<div class="aside-nav-title" @click="showIn = !showIn"><img src="/static/images/navigation-close.png" alt="" /></div>
			</div>
			<div>
				<el-menu default-active="TeachingPlan" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#ffffff" :router=true>
				 	<el-menu-item index="TeachingPlan">
				 	  <i class="el-icon-menu"></i>
				 	  <span slot="title">课程列表</span>
				 	</el-menu-item>
				 		<el-menu-item index="TeachingTemplate">
				 	  <i class="el-icon-tickets"></i>
				 	  <span slot="title">教案模板</span>
				 	</el-menu-item>
				</el-menu>
			</div>
		</div>
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
				isCollapse: true,
				collapsed: true,
				showIn:false,
				whatNavigation:1,
				isTrue:true
			}
		},
		methods: {
			collapse: function() {
				this.collapsed = !this.collapsed;
			},
			openNavigation:function(){
				this.isCollapse = true;
				var _this = this;
				setTimeout(function(){
					_this.isTrue = true;
				},200)
			},
			closeNavigation:function(){
				this.isCollapse = false;
				this.isTrue = false;
			}
		},
		//接收从headTop传来的参数
		mounted:function(){
			var _this = this;
			pub.$on('index',function(index){//监听first组件的txt事件
				console.log('接收到的index是'+index);
				if(index === 0){
					_this.whatNavigation = 0;
				}else if(index === 1){
					_this.whatNavigation = 1;
				}else if(index === 2){
					_this.whatNavigation = 2;
				}
			});
		}
	}
</script>
<style type="text/css">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    min-height: 400px;
	}
</style>
<style scoped>
	ul li{
		list-style: none;
	}
	.slide-fade-in-enter-active {
	  animation: bounce-in .2s;
	}
	.slide-fade-in-leave-active {
	  animation: bounce-in .2s reverse;
	}
	@keyframes bounce-in {
	  0% {
	    width:60px;
	  }
	  100% {
	    width:200px;
	  }
	}
	.aside-nav{
		width:200px;
		margin-right: 20px;
	}
	.aside-nav-title{
		text-align: center;
		height:50px;
		background-color: #eef1f6;
		line-height: 50px;
		cursor:pointer;
	}
	.aside-nav-title img{
		width:35px;
		height:35px;
	}
	.aside-nav-in{
		width:65px;
		margin-right: 20px;
	}
	.aside-nav-title-in{
		text-align: center;
		height:50px;
		background-color: #eef1f6;
		line-height: 50px;
	}
	.aside-nav-title-in img{
		width:35px;
		height:35px;
	}
</style>