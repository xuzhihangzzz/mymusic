/*
 * @Author: xuzhihang
 * @Date:   2020-12-13 17:05:24
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-04-22 14:12:45
 * 
 * 2021-1-23 歌单部分全部完成
 * 2021-4-16 项目大致完成
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueLazyLoad from 'vue-lazyload'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.use(ElementUI);
// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/placeholder.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
