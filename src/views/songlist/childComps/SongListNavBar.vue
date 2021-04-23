<template>
  <div class="song-list-nav-bar shadow">
    <div class="title flex-center">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">全部歌单</span>
      </el-dropdown>
    </div>
    <div class="hot-tag flex-row">
      <p>热门标签：</p>
      <ul class="flex-center">
        <li v-for="(item, index) in hotTags" :key="index" 
          @click="hotTagItemClick(index, item.name)" 
          :class="{active: currentIndex === index}"> {{item.name}} </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SongListNavBar',
    data() {
      return {
        currentIndex: 10
      }
    },
    props: {
      hotTags: {
        type: Array,
        default() {
          return []
        }
      },
      categoryList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      hotTagItemClick(index, name) {
        this.currentIndex = index
        // 把点击的热门标签名传给父组件
        this.$emit('changeTag', name)
      },
      categoryItemClick(name) {
        // this.currentIndex = index
        // 把点击的分类标签名传给父组件
        this.$emit('changeCategory', name)
      }
    }
  }
</script>
<style lang="less" scoped>
  h1, h2, h3, h4, h5, h6, hr, html, input, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  li, ol, ul {
    list-style: none;
  }
  ul li:hover{
    color: #8b8b8b;
  }
  .active {
    color: red;
  }
  .song-list-nav-bar {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;
    margin-left: 15px;

    border-radius: 5px;
  }
  .title {
    width: auto;
    height: 100%;
    padding: 0 5px 0 15px;
    background: #fa2800;
    border-radius: 5px 0 5px 5px;
    color: #fff;
    cursor: pointer;
    margin-right: 15px;
  }
  span {
    color: #ffffff;
  }
  .el-dropdown-link {
    padding-right: 11px;
  }
  .hot-tag {
    padding: 10px;
    flex: 1;
    height: 100%;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hot-tag {
    ul {
      li {
        margin: 0 5px;
        padding-right: 10px;
        cursor: pointer;
      }
    }
  }
  .flex-row {
    display: flex;
    align-items: center;
  }
  .shadow {
    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
  }
</style>
