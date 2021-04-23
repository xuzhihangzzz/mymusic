<template>
  <div class="nav-bar">
    <div class="content">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavBar'    
  }
</script>
<style lang="less" scoped>
  .nav-bar {
    /* 导航栏 */
    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .content {
      /* 导航栏的内容 */
      max-width: 1380px;
      width: 100%;
      padding-right: 15px;
      padding-left: 15px;
      margin-right: auto;
      margin-left: auto;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .left {
    width:180px;
    padding-left: 15px;
  }
  .center {
    /* center作为flex项目，占满中间 */
    flex: 1;
  }
  .right {
    width:300px;
    padding-right: 15px;
  }
</style>
