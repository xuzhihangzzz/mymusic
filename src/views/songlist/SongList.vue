<template>
  <div class="song-list">
    <div class="list-wrap">
      <!-- 歌单页的导航栏 -->
      <song-list-nav-bar 
        :category-list="categoryList" 
        :hot-tags="hotTags" 
        @changeTag="changeTag"
        @changeCategory="changeCategory"
      ></song-list-nav-bar>
      <!-- 歌单列表 -->
      <reusable-song-list 
        :song-lists="songLists" 
        :total="totalCount" 
        :show-pagination="showPagination"
        @changePage="changePage" 
      />
    </div>
    
  </div>
</template>

<script>
  import SongListNavBar from './childComps/SongListNavBar'
  import ReusableSongList from 'components/common/ReusableSongList'

  import {getSongLists, getHotTags, getCategoryList} from 'network/songlist.js'

  export default {
    
    name: 'SongList',
    data() {
      return {
        songLists: [],
        // 歌单总数
        totalCount: 0,
        // 热门歌单分类
        hotTags: [],
        // 当前页码
        pageVal: 0,
        // 标签名，默认为 "全部"
        tagName: '全部',
        // 歌单分类列表
        categoryList: [],
        // 显示分页组件
        showPagination: true
      }
    },
    components: {
      SongListNavBar,
      ReusableSongList
    },
    mounted() {
      window.scroll(0, 0);
      // 如果url上有cat值，就先按这个cat值查询歌单。实现的是点击标签查询相关歌单
      let cat = this.$route.query.cat
      // console.log(cat)
      if (cat) {
        this.tagName = cat
      }

      getSongLists('hot', this.tagName, 40, 0).then(res => {
        // console.log(res)
        this.songLists = res.playlists;
        this.totalCount = res.total
      })
      getHotTags().then(res => {
        // console.log(res)
        this.hotTags = res.tags
      })
      getCategoryList().then(res => {
        // console.log(res)
        // this.categoryList = res.sub
      })
    },
    methods: {
      changePage(val) {
        // 监听子组件发射的自定义事件，获取到当前页码，向后端请求对应页码的数据
        this.pageVal = val
        getSongLists('hot', this.tagName, 40, (val-1)*40).then(res => {
          this.songLists = res.playlists;
        })
      },
      changeTag(name) {
        this.tagName = name
        console.log(this.pageVal)
        getSongLists('hot', this.tagName, 40, (this.pageVal-1)*40).then(res => {
          this.songLists = res.playlists;
        })
      },
      changeCategory(name) {
        this.tagName = name
        console.log(this.pageVal)
        getSongLists('hot', this.tagName, 40, (this.pageVal-1)*40).then(res => {
          this.songLists = res.playlists;
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .song-list {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
  }
  .list-wrap {
    max-width: 1380px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
  }

</style>
