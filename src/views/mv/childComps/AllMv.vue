<template>
  <div class="allmv">
    <div class="mv-container">
      <div class="mv-item" v-for="(item, index) in moreMv" :key="index" @click="intoMvDetail(item.id)">

        <!-- 图片加播放量的div -->
        <div class="imgText">
          <img v-lazy="getUrl(item.cover)" alt="">
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

      <infinite-loading @infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
      <!-- 放在循环体下，当到此位置时会执行onInfinite方法 -->
    </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';

  import {getMv} from 'network/mv.js'

  export default {
    name: 'AllMv',
    components: {
      InfiniteLoading
    },
    data() {
      return {
        moreMv:[],  // 用来存放数据的数组
        page_no:1,   // 默认显示第一页数据
        page_size:12, // 每次请求40条
      }
    },
    created() {
      this.moreMv.length = 0;
      // 页面初始化时请求第一页的数据
      this.getCourseList();
    },
    methods: {
      getUrl(cover) {
        var url = cover + '?param=325y197'
        return url
      },
      getCourseList(){
        getMv(12, (this.page_no-1)*12).then(res => {
          // console.log(res)
          if (res.hasMore === true) {
            // 如果查询结果为真
            if (res.data.length) {
              // 如果有数据则进入将新的数据与老的数据拼接
              this.moreMv = this.moreMv.concat(res.data);
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
              this.page_no+=1;  //将页码加1
            }else{
              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete'); //没有数据显示没有更多了
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 进入MV详情页
      intoMvDetail(id) {
        this.$router.push({
          path: '/mv/detail',
          query: {
            id: id
          }
        })
      },
      onInfinite() {
        // 因为在页面初始化时请求了第一页的数据，所以当页面等于2时才请求数据
        if(this.page_no!=1){
          this.getCourseList()
        }
      }
    }
  }
</script>

<style scoped>
  .allmv {
    margin-top: 20px
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
  .mv-container h2 {
    font-size: 14px;
    display: block;
    line-height: 1.3;
    font-weight: 500;
    margin-top: 10px !important;
  }
  .mv-container {
    display: flex;
    flex-wrap: wrap;
  }
  .mv-container .mv-item {
    flex: 0 0 25%;
    max-width: 25%;
    padding: 0 15px 30px 15px;
    cursor: pointer;
  }
  .imgText img {
    max-width: 100%;
    border-radius: 3px;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
  }
  .imgText {
    /* 子绝父相 */
    position: relative;
  }
  .mv-item .count {
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
  }
  .mv-container .mv-item .count .icon {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 6px;
    border-color: transparent transparent transparent #fff;
    margin-right: 5px;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    /* 不换行 */
    white-space: nowrap;
  }
</style>
