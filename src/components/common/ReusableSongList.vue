<template>
  <div class="all-list">

    <div class="list-container">
      <div class="list-item" v-for="(item, index) in songLists" :key="index" @click="intoDetail(item.id)">

        <!-- 图片加播放量的div -->
        <div class="imgText">
          <img v-lazy="item.coverImgUrl" alt="">
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

    <!-- 分页 -->
    <div v-if="showPagination">
      <div class="page">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :page-size="40"
          @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'ReusableSongList',
    props: {
      songLists: {
        type: Array,
        default() {
          return []
        }
      },
      total: {
        type: Number,
        default() {
          return 0
        }
      },
      showPagination: {
        type: Boolean,
        default() {
          return false
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
      // 子传父，发射自定义事件，把点击的页码数发给父组件
      currentChange(val) {
        this.$emit('changePage', val)
      },
      // 进入歌单详情页
      intoDetail(id) {
        this.$router.push({
          path: '/playlist/detail',
          query: {
            id: id
          }
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .all-list {
    margin-top: 20px;
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

  .page {
    text-align: center;
  }
</style>
