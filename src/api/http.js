import axios from 'axios'
import router from '../router'

console.log(process.env.API_ROOT)
axios.defaults.baseURL = process.env.API_ROOT
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


//http response拦截器，如果返回401，返回登录页面

axios.interceptors.response.use(
	response => {
		return response;
	},
	error =>{
		if(error.response){
			switch (error.response.status) {
				case 401:
					router.push({path:'/'});
					break;
				default:
					break;
			}
		}
		return Promise.reject(error);
	}
);

export default axios;




