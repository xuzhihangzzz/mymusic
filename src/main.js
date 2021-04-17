/*
 * @Author: xuzhihang
 * @Date:   2020-12-13 17:05:24
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-04-16 16:52:25
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

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
