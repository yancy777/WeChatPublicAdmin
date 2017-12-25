<!--
**************************************
*	名称：主页面
*	作用：主页面框架用来嵌入
*	作者：闫聪洋
**************************************
-->
<template>
	<div>
		<head-top></head-top>
		<el-row style="margin-top: 71px;">
			<el-col :span="24" class="main">
				<aside-nav></aside-nav>
				<router-view class="router-view-box"></router-view>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import headTop from '../components/headTop';
	import asideNav from '../components/asideNav';
	export default {
		name: 'main',
		components: {
			headTop,
			asideNav
		}

	}
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	html {
		width: 100%;
		height: 100%;
	}
	
	.router-view-box {
		width: 100%;
		margin: 0 auto;
	}
	
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
	
	.main {
		min-height: 920px;
		display: flex;
		position: absolute;
		top: -1px;
		bottom: 0px;
	
	}
	
	aside {
		min-width: 50px;
		/*background: #333744;*/
	}
	
	aside .showSidebar {
		overflow-x: hidden;
		overflow-y: auto;
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
</style>