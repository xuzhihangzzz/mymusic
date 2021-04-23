<template>
  <div class="error-wrap">
    <img src="~assets/img/error.jpg" alt="">
  </div>
</template>
<script>
  export default {
    name: 'NotFound'
  }
</script>
<style lang="less" scoped>
  .error-wrap {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
    img {
      width: 100%;
    }
  }
</style>