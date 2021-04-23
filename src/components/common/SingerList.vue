<template>
  <div class="singers-list">
    <div class="wrapper">
      <ul class="singers-container">
        <li class="singers-item" v-for="(item) in singers" :key="item.id">

          <div class="img-parent">
            <div class="img-class">
              <img v-lazy="getUrl(item.img1v1Url)" alt="">
            </div>
          </div>
        
          <div class="name ellipsis">
            <p>{{item.name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SingerList',
    methods: {
      getUrl(img1v1Url) {
        var url = img1v1Url + '?param=200y200'
        return url
      }
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

<style lang="less" scoped>
  li, ol, ul {
    list-style: none;
  }
  .singers-list {
    margin-top: 18px
  }
  .title {
    margin: 0 0 15px 15px;
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
