<template>
  <div class="all-singers">
    <div class="wrapper">
      <ul class="singers-container">
        <li class="singers-item" v-for="(item, index) in moreSingers" :key="index">
          <div class="img-parent">
            <div class="img-class">
              <img v-lazy="getUrl(item.img1v1Url)" alt="">
            </div>
          </div>
          <div class="name ellipsis">
            <p>{{item.name}}</p>
          </div>
        </li>
        <infinite-loading @infinite="onInfinite" ref="infiniteLoading"></infinite-loading>
        <!-- 放在循环体下，当到此位置时会执行onInfinite方法 -->
      </ul>
    </div>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading';

  import {getSingers} from 'network/singers.js'
  export default {
    name: 'AllSingers',
    components: {
      InfiniteLoading
    },
    data() {
      return {
        moreSingers:[],  // 用来存放数据的数组
        page_no:1,   // 默认显示第一页数据
        page_size:40, // 每次请求40条
      }
    },
    created() {
      this.moreSingers.length = 0;
      // 页面初始化时请求第一页的数据
      this.getCourseList();
    },
    methods: {
      getUrl(img1v1Url) {
        var url = img1v1Url + '?param=200y200'
        return url
      },
      getCourseList(){
        getSingers(40, (this.page_no-1)*40, -1, -1, -1).then(res => {
          // console.log(res)
          if (res.code === 200) {
            // 如果查询结果为真
            if (res.artists.length) {
              // 如果有数据则进入将新的数据与老的数据拼接
              this.moreSingers = this.moreSingers.concat(res.artists);
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
      onInfinite() {
        // 因为在页面初始化时请求了第一页的数据，所以当页面等于2时才请求数据
        if(this.page_no!=1){
          this.getCourseList()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  li, ol, ul {
    list-style: none;
  }
  .all-singers {
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
  .wrapper {
    margin-right: 30px;
  }
  .singers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -30px 0;
  }
  .singers-item {
    padding: 0 15px 30px 15px;
    flex: 0 0 10%;
    max-width: 10%;
  }
  .img-parent {
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 50%;
    background-color: #d9d9d9;
  }
  .img-class {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    text-align: center;
    font-weight: 550;
    font-size: 14px;
    /* line-height: 18px; */
    word-break: break-word;
  }
</style>
