<template>
  <div class="recommend-singers">
    <h2 class="title">推荐歌手</h2>
    <singer-list :singers="singers"/>
  </div>
</template>

<script>
  import SingerList from 'components/common/SingerList'
  export default {
    name: 'RecommendSingers',
    components: {
      SingerList
    },
    props: {
      singers: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend-singers {
    margin-top: 18px
  }
  .title {
    margin: 0 0 15px 15px;
  }
  h2 {
    font-size: 16px;
    display: block;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
</style>
