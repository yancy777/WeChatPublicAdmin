// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueValidator from 'vue-validator'
import axios from './api/http'
import App from './App'
import router from './router'
import './assets/theme/index.css'

import ElementUI from 'element-ui' 
//import 'element-ui/lib/theme-default/index.css'

import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'


//import Mock from './mock'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueValidator)
Vue.use(ElementUI)
Vue.use(BootstrapVue)
router.beforeEach((to,from,next)=>{
	console.log('ready!');
	if(window.applicationCache){
		next();
	}
	else{
		alert('该浏览器不支持html5');
	}
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


