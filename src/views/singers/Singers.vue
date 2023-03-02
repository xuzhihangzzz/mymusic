<template>
  <div class="singers">
    <div class="wrap">
      <all-singers></all-singers>
    </div>
  </div>
</template>

<script>
  import AllSingers from './childComps/AllSingers'

  export default {
    name: 'Singers',
    components: {
      AllSingers
    },
    mounted() {
      window.scroll(0, 0);
    }
  }
</script>

<style lang="less" scoped>
  .singers {
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
