<template>
  <div class="rank-and-user-lists">
    <h2 class="title">{{title}}</h2>

    <div class="list-container">
      <div 
        class="list-item" 
        v-for="(item, index) in lists" 
        :key="index"
        @click="intoDetail(item.id)"
      >

        <!-- 图片加播放量的div -->
        <div class="imgText">
          <img v-lazy="getUrl(item.coverImgUrl)" alt="">
          <div class="count">
            <!-- 播放图标 -->
            <i class="icon"></i>
            <!-- 播放量 -->
            <span>{{item.playCount | count}}</span>
          </div>
        </div>
        
        <div class="name">
          <h2>{{item.name}}</h2>
        </div>
        
      </div>
    </div>
  </div>
</template>

  <script>
  export default {
    name: 'RankAndUserLists',
    props: {
      title: {
        type: String,
        default() {
          return ''
        }
      },
      lists: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      count(value) {
        let numStr = value.toString()
        // 小于十万直接返回
        if (numStr.length < 6) {
          return numStr
        }
        return (value/10000).toFixed(1) + '万'
      }
    },
    methods: {
      getUrl(coverImgUrl) {
        var url = coverImgUrl + '?param=300y300'
        return url
      },
      intoDetail(id) {
        this.$router.push({
          path: '/playlist/detail',
          query: {
            id: id
          }
        })
      }
    }
  }
  </script>
<style lang="less" scoped>
  .rank-and-user-lists {
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
  }
  .list-container {
    display: flex;
    flex-wrap: wrap;
    h2 {
      font-size: 14px;
      font-weight: 550;
      margin: 0 !important;
    }
    .list-item {
      flex: 0 0 12.5%;
      max-width: 12.5%;
      padding: 0 15px 30px 15px;
      cursor: pointer;
      .imgText {
        img {
          max-width: 100%;
          border-radius: 3px;
          box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
        }
      }
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
  }
  .name {
    margin-top: 15px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 700;
    line-height: 18px;
  }
</style>
