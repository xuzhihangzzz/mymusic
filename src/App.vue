<template>
  <div id="app">
    <!-- 顶部导航栏 -->
    <div class="nav" v-if="$route.meta.keepAlive">
      <main-nav-bar/>
    </div>
    
    <router-view/>

    <!-- 底部说明栏 -->
    <div v-if="$route.meta.keepAlive">
      <footer-explain/>
    </div>
    
    <play-bar></play-bar>
  </div>
</template>
<script>
  import MainNavBar from 'components/common/MainNavBar'
  import FooterExplain from 'components/common/FooterExplain'
  import PlayBar from 'components/content/PlayBar'
  export default {
    name: 'App',
    components: {
      MainNavBar,
      FooterExplain,
      PlayBar
    }
  }
</script>
<style lang="less">
  .link-active, .link-exact-active {
    color: red !important;
  }
  @import "~assets/css/base.css";
</style>
