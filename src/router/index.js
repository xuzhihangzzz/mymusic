/*
 * @Author: xuzhihang
 * @Date:   2020-12-13 17:05:46
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-04-22 14:31:46
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home')
const Login = () => import('views/login/Login')
const User = () => import('views/user/User')
const SongList = () => import('views/songlist/SongList')
const Singers = () => import('views/singers/Singers')
const Mv = () => import('views/mv/Mv')
const Rank = () => import('views/rank/Rank')
const SongListDetail = () => import('views/songListDetail/SongListDetail')
const MvDetail = () => import('views/mvDetail/MvDetail')
const Search = () => import('views/search/Search')
const NotFound = () => import('views/notfound/NotFound')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      keepAlive: false//导航栏和底部说明栏在该页面不显示
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/songlist',
    component: SongList,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/singers',
    component: Singers,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/mv',
    component: Mv,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/rank',
    component: Rank,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/playlist/detail',
    component: SongListDetail,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/mv/detail',
    component: MvDetail,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'link-exact-active'
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/user') {
    // 获取token
    const tokenStr =  window.sessionStorage.getItem('token') 
    if (!tokenStr) {
      // 未登录，没有token访问user页面时，强制跳转登录页面
      return next('/login')
    }
  }
  // 访问其他页面都放行
  next()
  
})

export default router
