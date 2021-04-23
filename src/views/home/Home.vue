<template>
  <div id="home">
    <div class="home-container">
      <!-- 轮播图 -->
      <home-swiper :banners="banners"></home-swiper>
      <!-- 推荐歌单 -->
      <recommend-song-list :recommend-song-list="recommendSongList" />
      <!-- 最新音乐 -->
      <new-songs :new-songs="newSongs" />
      <!-- 推荐MV -->
      <recommend-mv :recommend-mvs="recommendMvs" />
      <!-- 推荐歌手 -->
      <recommend-singers :singers="singers" />
    </div>
    
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendSongList from './childComps/RecommendSongList'
  import NewSongs from './childComps/NewSongs'
  import RecommendMv from './childComps/RecommendMv'
  import RecommendSingers from './childComps/RecommendSingers'
  import { createRecommendSong } from 'model/song.js'
  import {getSwiper, getRecommendSongList, getNewSongs, getRecommendMv, getSingers} from 'network/home.js'

  export default {
    
    name: 'Home',
    data() {
      return {
        banners: [],
        recommendSongList: [],
        newSongs: [],
        recommendMvs: [],
        singers: []
      }
    },
    components: {
      HomeSwiper,
      RecommendSongList,
      NewSongs,
      RecommendMv,
      RecommendSingers
    },
    mounted() {
      window.scroll(0, 0);
      // 请求轮播图数据，存放在data中
      // type值的含义：0: pc; 1: android; 2: iphone; 3: ipad
      getSwiper(0).then(res => {
        this.banners = res.banners
      })

      // 请求推荐歌单数据
      getRecommendSongList(24).then(res => {
        this.recommendSongList = res.result
      })
      
      // 请求最新音乐数据
      getNewSongs(10).then(res => {
        this.newSongs = this._normalizeSongs(res.result)
      })

      // 请求推荐mv
      getRecommendMv(4).then(res => {
        this.recommendMvs = res.result
      })

      // 请求歌手数据
      getSingers(30).then(res => {
        this.singers = res.artists
      })
    },
    methods: {
      // 处理歌曲
      _normalizeSongs(list) {
        let ret = []
        list.map(item => {
          if (item.id) {
            ret.push(createRecommendSong(item))
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="less" scoped>
  #home {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
  }
  .home-container {
    max-width: 1380px;
    width: 100%;
    margin: 0 auto;
    padding-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
