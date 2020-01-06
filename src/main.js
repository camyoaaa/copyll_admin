// with polyfills
import 'core-js/stable' //polyfill only stable `core-js` features - ES and web standards   使支持web标准?
import 'regenerator-runtime/runtime' //使非现代浏览器支持async await

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import {
  VueAxios
} from './utils/request'

import VueSeamlessScroll from 'vue-seamless-scroll' //无缝滚动插件,用于滚动充值动态


import VueJsonp from 'vue-jsonp' //在调用淘宝接口时会用到jsonp
// import HappyScroll from 'vue-happy-scroll'//滚动条美化插件,使用时有问题,暂时弃用
import VuePerfectScrollbar from 'vue-perfect-scrollbar' //滚动条美化插件

// 引入css
// import 'vue-happy-scroll/docs/happy-scroll.css'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock' //拦截ajax请求,模拟后端返回数据

import bootstrap from './core/bootstrap' //项目响应式配置
import './core/lazy_use' //UI插件按需加载
// import './permission' // permission control 权限控制
import './utils/filter' // global filter
import './components/global.less' //全局样式

Vue.config.productionTip = false

Vue.use(VueSeamlessScroll)
Vue.use(VueJsonp)
// Vue.use(HappyScroll)
Vue.component(VuePerfectScrollbar.name, VuePerfectScrollbar)
// mount axios Vue.$kaxios and this.$kaxios
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap, //在created生命周期初始化布局配置
  render: h => h(App)
}).$mount('#app')