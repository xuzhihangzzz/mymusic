<template>
  <div class="recommend-mv">
    <h2 class="title">推荐MV</h2>

    <div class="mv-container">
      <div class="mv-item" v-for="(item, index) in recommendMvs" :key="index" @click="intoMvDetail(item.id)">

        <!-- 图片加播放量的div -->
        <div class="imgText">
          <img v-lazy="item.picUrl" alt="">
          <div class="count">
            <!-- 播放图标 -->
            <i class="icon"></i>
            <!-- 播放量 -->
            <span>{{item.playCount}}</span>
          </div>
        </div>
        
        <div class="name ellipsis">
          <h2>{{item.name}}</h2>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'RecommendMv',
    props: {
      recommendMvs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      // 进入MV详情页
      intoMvDetail(id) {
        console.log(id)
        this.$router.push({
          path: '/mv/detail',
          query: {
            id: id
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .recommend-mv {
    margin-top: 20px
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
  .mv-container {
    display: flex;
    flex-wrap: wrap;
    h2 {
      font-size: 14px;
      display: block;
      line-height: 1.3;
      font-weight: 500;
      margin-top: 10px !important;
    }
    .mv-item {
      flex: 0 0 25%;
      max-width: 25%;
      padding: 0 15px 30px 15px;
      cursor: pointer;
      .count {
        position: absolute;
        right: 10px;
        top: 1px;
        height: 24px;
        padding-left: 9px;
        background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
        background-size: cover;
        color: #fff;
        font-size: 12px;
        font-weight: 530;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          display: block;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 4px 0 4px 6px;
          border-color: transparent transparent transparent #fff;
          margin-right: 5px;
        }
      }
    }
  }
  .imgText {
    /* 子绝父相 */
    position: relative;
    img {
      max-width: 100%;
      border-radius: 3px;
      box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
    }
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    /* 不换行 */
    white-space: nowrap;
  }
</style>
