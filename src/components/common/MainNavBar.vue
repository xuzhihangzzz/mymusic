<template>
  <div class="main-nav-bar">
    <nav-bar class="home-nav">
        <div slot="left" class="logo" @click="toHome()">
          <a style="cursor:pointer"></a>
        </div>
        <div class="center" slot="center">
          <router-link v-for="item in homeNav" :key="item.path" :to="item.path" tag="a">{{item.name}}</router-link>
        </div>
        
        <div class="right" slot="right">
          <div>
            <el-input 
              placeholder="输入内容并按回车键搜索" 
              prefix-icon="el-icon-search"
              v-model="input2" 
              @keyup.enter.native="search"
            >
            </el-input>
          </div>
          <el-button size="medium" type="primary" class="right-item" @click="loginClick">登录</el-button>
        </div>
      
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/NavBar'

  import {homeNav} from 'assets/data/homeNav'
import { constants } from 'fs'

  export default {
    name: 'MainNavBar',
    data() {
      return {
        input2: '',
        // 导航栏
        homeNav: []
      }
    },
    components: {
      NavBar
    },
    created() {
      this.homeNav = homeNav
    },
    methods: {
      toHome() {
        this.$router.push('/home')
      },
      loginClick() {
        this.$router.push('/login')
      },
      search() {
        if (this.input2.split(' ').join('').length !== 0) {
          this.$router.push({
            path: '/search',
            query: {
              keyword: this.input2
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .main-nav-bar .home-nav .logo a {
    width: 100%;
    display: block;
    height: 70px;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 150px 40px;
    background-image: url(~assets/img/home_logo.png);
  }
  .right {
    align-items: center;
    display: flex;
    justify-content: flex-end;
  }
  .right .right-item {
    height: 40px;
    margin-left: 10px;
  }
  .center {
    /* center作为flex容器，让里面的项目使用flex布局 */
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin-left: 15px;
  }
  .center a {
    color: black;
    margin-left: 15px;
    margin-right: 15px;
  }
</style>
