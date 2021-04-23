<template>
  <div class="mv">
    <div class="wrap">
      <all-mv></all-mv>
    </div>
  </div>
</template>

<script>
  import AllMv from './childComps/AllMv'
  export default {
    name: 'Mv',
    components: {
      AllMv
    },
    mounted() {
      window.scroll(0, 0);
    }
  }
</script>

<style lang="less" scoped>
  .mv {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
  }
  .wrap {
    max-width: 1380px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
