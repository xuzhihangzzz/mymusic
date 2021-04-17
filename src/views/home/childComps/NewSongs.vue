<template>
  <div class="new-songs">
    <h2 class="title">推荐音乐</h2>

    <div class="new-songs-container">
      <div class="songs-item" v-for="(item, index) in newSongs" :key="item.id">
        <div class="complete-item">
          <!-- 播放icon -->
          <div class="front-icon">
            <i class="el-icon-video-play" @click="playSong(item, index)"></i>
          </div>
          <div class="img">
            <img :src="item.image" alt="">
          </div>
          <!-- 歌名、歌手名 -->
          <div class="info ellipsis">
            <p class="song-name ellipsis">{{item.name}}</p>
            <p class="author ellipsis">
              <span>{{item.singer}}</span>
            </p>
          </div>
          <!-- 专辑 -->
          <div class="album">《{{item.album}}》</div>
          <!-- 歌曲时长 -->
          <div class="duration">{{timeFormat(item.duration)}}</div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import utils from 'utils/utils'
  export default {
    name: 'NewSongs',
    props: {
      newSongs: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
    },
    methods: {
      ...mapActions([
        'selectPlay',
        'playAll',
        'pausePlay'
      ]),
      playSong(item, index) {
        this.selectPlay({
          list: this.newSongs,
          index
        })
      },
      pauseSong() {
        this.pausePlay()
      },
      timeFormat(value) {
        // value单位是秒
        return utils.formatSecondTime(value)
      }
    }
  }
</script>

<style scoped>
  .new-songs {
    margin-top: 2px;
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
  .new-songs-container {
    display: flex;
    /* 换行 */
    flex-wrap: wrap;
  }
  .new-songs-container .songs-item {
    flex: 0 0 50%;
    max-width: 50%;

    margin-bottom: 20px;
    height: 80px;
    padding: 0 15px 30px;
  }
  .front-icon {
    width: 30px;
    margin-right: 12px;
  }
  .new-songs-container .songs-item .complete-item {
    display: flex;
    align-items: center;

    width: 100%;
    height: 80px;
    background-color: #fff;
    /* flex元素从主轴首开始排列，没有间距 */
    justify-content: flex-start;
    padding: 0 4%;
    border-radius: 5px;
    position: relative;

    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
  }
  .new-songs-container .songs-item .complete-item .img img {
    width: 55px;
    height: 55px;
    border-radius: 5px;
    /* position: relative; */
    margin-right: 30px;
  }
  .new-songs-container .songs-item .complete-item .info {
    width: 15%;
  }
  .author {
    margin: 0 !important;
  }
  .new-songs-container .songs-item .complete-item .info .author span {
    font-size: 14px;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    /* 不换行 */
    white-space: nowrap;
  }
  .new-songs-container .songs-item .complete-item .info .song-name {
    font-size: 14px;
    color: #333;
    font-weight: 700;
    margin-top: 0 !important;
    margin-bottom: 10px !important;
  }
  .album {
    flex: 1;
  }
  .album, .duration {
    font-size: 13px;
    color: #333;
    font-weight: 700;
    margin-left: 80px;
  }

</style>
