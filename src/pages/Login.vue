<template>
	<div class="login-form" @keydown.enter="login">		
    <p class="title">睿莱数据统计平台</p>
		<div class="login-center ">
			<div class="login-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="username" class="user-name-box">
              <el-input
                placeholder="请输入用户名"
                v-model="ruleForm.username"
                class="user-name">
              </el-input>
          </el-form-item>
          <el-form-item prop="password" class="user-password-box">
              <el-input
                placeholder="请输入密码"
                v-model="ruleForm.password"
                class="user-password"
                type="password">
              </el-input>
          </el-form-item>
        </el-form> 
				<button v-on:click="login">登 录</button>
			</div>
		</div>		
	</div>
</template>
<script>
import Vue from "vue";
import router from "../router";
import context from "../utils/context";
export default {
  name: "login",
  data: function() {
    return {
      username: null,
      password: null,
      ruleForm:{
        username:'',
        password:''
      },
      rules:{
          username:[{required:true,message:'请输入用户名',trigger:'blur' }],
          password:[{required:true,message:'请输入密码',trigger:'blur' }]
      }
    };
  },
  methods: {
    login: function() {
        this.$http.post("auth/logout").then(
          this.$http
            .get("authenticate/credentials", {
              params: {
                UserName: this.ruleForm.username,
                Password: this.ruleForm.password
              }
            })
            .then(
              response => {
                context.clear();
                this.message = "";
                  router.push({
                    path: "/main/Home_SaleData"
                  });               
              },
              response => {
                this.message = "用户名或密码错误";
              }
            )
        );
    }
  }
};
</script>
<style type="text/css">

.el-form-item__error{
  margin-left: 16%;
}
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

html {
  width: 100%;
  height: 100%;
}

body {
  margin: 0px;
  padding: 0px;
}

.login-form {
  background: url("/static/images/bg.png") no-repeat center;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}

.title{
  text-align: center;
  font-size: 40px;
  margin-top: 10%;
}


.login-box {
  height: 280px;
  background: #f1f1f1;
  padding-top: 15px;
  border-radius: 20px;
  width: 400px;
  border:2px solid #e6d4d6;
  margin:20px auto 0;
  text-align: center;
}

.user-name-box{
  margin-top: 25px;
}

.login-box .user-name {
  width: 68%;
}
.login-box .user-password {
  width: 68%;
}

.login-box span {
  color: #ba2131;
}

.login-box button {
  width: 68%;
  height: 45px;
  background: linear-gradient(to top,#e04455,#f0485b, #fe6d7e);
  border: none;
  font-size: 26px;
  color: #fff;
  margin-top: 35px;
  border-radius: 8px;
  cursor: pointer;
}

.login-box button:hover{
  background: linear-gradient(to top,#f75467,#f9576a, #f75467);
}
</style>