import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: require('../pages/Login')
    }, {
        path: '/main',
        component: require('../pages/Main'),
        children: [      
         {
            path: 'Home_SaleData',
            component: require('../pages/SaleDataHome'),
        },{
            path: 'Home_WeChat',
            component: require('../pages/WeChatHome'),
        },{
            path: 'TemplateInfo_WeChat',
            component: require('../pages/WeChatTemplateInfo'),
        },{
            path: 'TempalteHistory_WeChat',
            component: require('../pages/WeChatTempalteHistory'),
        },{
            path: 'AutoReply_WeChat',
            component: require('../pages/WeChatAutoReply'),
        },{
            path: 'QRcode_WeChat',
            component: require('../pages/WeChatQRcode'),
        },{
            path: 'CustomMenu_WeChat',
            component: require('../pages/WeChatCustomMenu'),
        },{
            path: 'CustomMenu_WeChat',
            component: require('../pages/WeChatCustomMenu'),
        },{
            path: 'TeachingPlan',
            component: require('../pages/TeachingPlan'),
        },{
            path: 'TeachingTemplate',
            component: require('../pages/TeachingTemplate'),
        }]
    }]

})