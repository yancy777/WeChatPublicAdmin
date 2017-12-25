<!--
**************************************
*  名称：侧导航组件
*  作用：二级导航，显示\隐藏
*  作者：闫聪洋
**************************************
-->
<template>
	<div>
		<div v-if = 'whatNavigation'>
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
		<div v-else>
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
				whatNavigation:true,
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
					_this.whatNavigation = true;
				}else if(index === 1){
					_this.whatNavigation = false;
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

<!--<template>
	<div>
		<el-row class="aside-nav">-->
			<!--左侧导航-->
			<!--<div :class="{showSidebar:!collapsed}">-->
				<!--展开折叠开关-->
				<!--<div class="menu-toggle" @click.prevent="collapse">
					<i class="el-icon-d-arrow-right" v-show="collapsed"></i>
					<span v-show="!collapsed">&nbsp;</span><i class="el-icon-d-arrow-left nav-icon" v-show="!collapsed"></i>
				</div>-->
				<!--导航菜单-->
				<!--<el-menu default-active="/main/home" router :collapse="collapsed" style="background: #fff ;">-->
					<!--<el-menu-item index="/main/home">
						<i class="el-icon-menu"></i>
						<span slot="title">&nbsp; 总 览 </span>
					</el-menu-item>
				</el-menu>
			</div>
		</el-row>
	</div>
</template>-->
<!--<script>
	import Vue from 'Vue'
	import content from '../utils/context'
	import router from '../router'
	export default {
		data() {
			return {
				isCollapse: true,
				collapsed: true

			}
		},
		methods: {
			collapse: function() {
				this.collapsed = !this.collapsed;
			}
		}
	}
</script>

<style scoped>

	.menu-toggle {
		line-height: 50px;
		background: #eeeeee;
	}
	
	.menu-toggle .nav-icon {
		min-width: 150px;
	}
	
	.content-container {
		background: #fff;
		flex: 1;
		overflow-y: auto;
		padding: 10px;
		padding-bottom: 1px;
	}
	
	.content-wrapper {
		background-color: #fff;
		box-sizing: border-box;
	}
</style>-->