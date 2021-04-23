<template>
  <div>
    <div class="search-box">
      <el-input
        class="search-input"
        maxlength="128"
        placeholder="输入搜索内容并按回车键搜索" 
        prefix-icon="el-icon-search" 
        type="text"
        v-model="keyword" 
        @keyup.enter.native="search"
      />
    </div>

    <div class="search">
      <div class="header">
        <h2 class="word">
          搜索结果
        </h2>
        <div class="nav">
          <a :class="type === 1 ? 'active' : ''" @click="changeType(1)">单曲</a>
          <a :class="type === 100 ? 'active' : ''" @click="changeType(100)">歌手</a>
          <a :class="type === 1000 ? 'active' : ''" @click="changeType(1000)">歌单</a>
        </div>
      </div>
      <div class="result">
        <songs-of-song-list :songs="songs" v-if="type === 1"/>
        <singer-list :singers="singers" v-if="type === 100"/>
        <reusable-song-list 
          :songLists="playList" 
          :show-pagination="showPagination"
          v-if="type === 1000">
        </reusable-song-list>
      </div>
    </div>
  </div>
</template>
<script>
  import SongsOfSongList from 'components/common/SongsOfSongList'
  import SingerList from 'components/common/SingerList'
  import ReusableSongList from 'components/common/ReusableSongList'
  import {search} from 'network/search.js'
  import {getSongDetail} from 'network/songlist.js'
  import { createSong } from 'model/song.js'
  export default {
    name: 'Search',
    data() {
      return {
        // 搜索的内容
        keyword: '',
        // 搜索的类型，默认为1(单曲)
        type: 1,
        // 结果详情
        detail: {},
        // 单曲列表
        songs: [],
        // 歌手列表
        singers: [],
        // 歌单列表
        playList: [],
        loading: false,
        // 搜索结果一共只有30个歌单，不显示分页组件
        showPagination: false
      }
    },
    components: {
      SongsOfSongList,
      SingerList,
      ReusableSongList
    },
    methods: {
      // 更改搜索类型
      changeType(type) {
        this.type = type
        // 更改后重新搜索，以更新搜索结果
        this.search()
      },
      search() {
        if (this.keyword.split(' ').join('').length !== 0) {
          search(this.keyword, this.type).then(res => {
            console.log(res)
            if (res.code === 200) {
              switch (this.type) {
                case 1:
                  let lists = res.result.songs
                  let sliceArr = []
                  // 只保留歌曲id，放入数组
                  lists.map(item => {
                    sliceArr.push(item.id)
                  })
                  this.getResultSongDetail(sliceArr)
                  break;
                case 100:
                  this.singers = res.result.artists
                  break;
                case 1000: 
                  this.playList = res.result.playlists
                  break;
                default:
                  let lists2 = res.result.songs
                  let sliceArr2 = []
                  lists2.map(item => {
                    sliceArr2.push(item.id)
                  })
                  this.getResultSongDetail(sliceArr2)
                  break;
              }
            }
          })
        }
      },
      // 获取歌曲列表
      async getResultSongDetail(sliceArr) {
        this.loading = true
        let timestamp = new Date().valueOf()
        let ids = sliceArr.join(',')
        try {
          let beforeRes = await getSongDetail(ids, timestamp)
          let res = beforeRes.songs
          this.songs = this._normalizeSongs(res)
          this.loading = false
        } catch (error) {
          console.log(error)
        }
      },
      // 处理歌曲
      _normalizeSongs(list) {
        let ret = []
        list.map(item => {
          if (item.id) {
            ret.push(createSong(item))
          }
        })
        return ret
      }
    },
    watch: {
      // 检测导航栏搜索框内容
      $route(newObj, oldObj) {
        if(newObj.query.keyword !== oldObj.query.keyword) {
          this.keyword = newObj.query.keyword
          this.search()
        }
      }
    },
    mounted() {
      window.scroll(0, 0);
      let keyword = this.$route.query.keyword
      if (keyword) {
        this.keyword = keyword
        this.search()
      }
    }
  }
</script>
<style lang="less" scoped>
  .active {
    color: red !important;
  }
  .search-box {
    width: 100%;
    margin-top: 70px;
    height: 250px;
    background: url(../../assets/img/result.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;

    position: relative;
    .search-input {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 720px;
    }
  }
  .search {
    max-width: 1380px;
    width: 100%;
    margin: 0 auto;
    margin-top: 43px;
    padding-right: 15px;
    padding-left: 15px;
    .header {
      display: flex;
      align-items: center;
      .nav {
        a {
          cursor: pointer;
          height: 20px;
          font-size: 15px;
          line-height: 20px;
          margin-right: 34px;
          font-weight: 300;
          color: #333;
          text-align: center;
        }
      }
    }
    .word {
      font-size: 22px;
      font-weight: 600;
      line-height: 30px;
      margin-right: 40px;
      color: #4a4a4a
    }
  }
</style>