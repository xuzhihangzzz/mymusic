<template>
  <!-- 具体歌单下的歌曲列表 -->
  <div class="artist-box">
    <div class="tool-head">
      <div class="item play-item" @click="playAllSong">
        <i class="iconfont iconbofang"></i>
        播放全部
      </div>
      <!-- <div
        class="item"
        @click="collect()"
        :class="subscribed ? 'active' : ''"
        v-if="!isPerson"
      >
        <i class="iconfont niceicon-heart"></i>
        {{ collectText }}
      </div> -->
    </div>
    <table class="artist-table">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">歌曲</th>
          <th class="th-artist">歌手</th>
          <th class="th-album">专辑</th>
          <th class="th-duration">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of songs"
          :key="item.id"
          :class="currentSong.id == item.id && playing ? 'playing' : ''"
        >
          <td>
            <div class="index-container flex-center">
              <span class="num">{{ formatZero(index + 1, 2) }}</span>
              <!-- <div class="play-icon">
                <div class="line" style="animation-delay: -1.2s;"></div>
                <div class="line"></div>
                <div class="line" style="animation-delay: -1.5s;"></div>
                <div class="line" style="animation-delay: -0.9s;"></div>
                <div class="line" style="animation-delay: -0.6s;"></div>
              </div> -->
              <i class="iconfont iconbofang play-btn" @click="playSong(item, index)"></i>
            </div>
          </td>
          <td>
            <div class="name-container">
              <div class="avatar">
                <el-image
                  :key="item.image + '?param=100y100'"
                  :src="item.image + '?param=100y100'"
                  lazy
                >
                  <div
                    slot="placeholder"
                    class="image-slot flex-center flex-column"
                  >
                    <i class="iconfont niceicon-3"></i>
                  </div>
                  <div slot="error" class="image-slot flex-center">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <p class="name ellipsis" :title="item.name">{{ item.name }}</p>
            </div>
          </td>
          <td>
            <div class="artist-container">
              <p class="author ellipsis" :title="item.singer">
                {{ item.singer }}
              </p>
            </div>
          </td>
          <td>
            <div class="album-container">
              <p :title="item.album" class="ellipsis">{{ item.album }}</p>
            </div>
          </td>
          <td>
            <div class="duration-container">
              <p>{{ formatSecondTime(item.duration) }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import utils from 'utils/utils.js'
export default {
  name: 'SongsOfSongList',
  data() {
    return {}
  },
  props: {
    songs: {
      type: Array
    },
    subscribed: {
      type: Boolean
    },
    isPerson: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  computed: {
    ...mapGetters(['currentIndex', 'playing', 'currentSong'])
    // collectText() {
    //   return this.subscribed ? '已收藏' : '收藏'
    // }
  },
  watch: {},
  methods: {
    formatZero(num, len) {
      return utils.formatZero(num, len)
    },
    formatSecondTime(duration) {
      return utils.formatSecondTime(duration)
    },
    // 播放歌曲
    playSong(item, index) {
      // 根据数组和索引定位到点击的歌
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    // 播放全部
    playAllSong() {
      this.playAll({
        list: this.songs
      })
    },
    // 收藏歌单
    // async collect() {
    //   this.$emit('collectArtist')
    // },
    ...mapActions([
      // 点击选择播放
      'selectPlay',
      // 点击播放全部
      'playAll',
      'pausePlay'
    ])
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
  @import "http://at.alicdn.com/t/font_2286501_7kv112w97p4.css";
  .artist-box >>> tbody img {
    border-radius: 5px;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
  }
  .artist-box {
    width: 950px;
    width: 100%;
  }
  .artist-box .tool-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 15px 0;
  }
  .artist-box .tool-head .item {
    background: #f2f2f2;
    color: #333333;
    padding: 7px 15px;
    border-radius: 50px;
    cursor: pointer;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s;
  }
  .artist-box .tool-head .item i {
    margin-right: 5px;
  }
  .artist-box .tool-head .item .nicefenxiang1 {
    font-size: 18px;
  }
  .artist-box .tool-head .item .active {
    background: #fa2800;
    color: #fff;
  }
  .artist-box .tool-head .play-item {
    background: #fa2800;
    color: #fff;
  }
  .artist-box .artist-table thead {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #fafafa;
    color: #999;
  }
  .artist-box .artist-table thead th {
    padding: 0 9px;
    text-align: left;
    font-weight: 300;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .artist-box .artist-table thead th .th-index {
    width: 10%;
    text-align: center;
  }
  .artist-box .artist-table thead th .th-name {
    width: 40%;
  }
  .artist-box .artist-table thead th .th-artist {
    width: 25%;
  }
  .artist-box .artist-table thead th .th-album {
    width: 15%;
  }
  .artist-box .artist-table thead th .th-duration {
    width: 15%;
    text-align: right;
    padding-right: 40px;
  }
  .artist-box .artist-table {
    width: 100%;
  }
  .artist-box .artist-table tbody {
    width: 100%;
  }
  .artist-box .artist-table tbody tr {
    height: 50px;
    /* line-height: 50px; */
    transition: background-color .2s linear;
  }
  .artist-box .artist-table tbody tr td {
    padding: 0 9px;
    /* white-space: nowrap; */
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .artist-box .artist-table tbody tr .index-container .num {
    color: #4a4a4a;
    font-weight: 500;
  }
  .artist-box .artist-table tbody tr .index-container .play-icon {
    display: none;
    height: 16px;
    min-width: 18px;
    overflow: hidden;
  }
  .artist-box .artist-table tbody tr .index-container .play-icon .line {
    width: 2px;
    height: 100%;
    margin-left: 2px;
    background-color: #ff410f;
    animation: play .9s linear infinite alternate;
  }
  .artist-box .artist-table tbody tr .index-container .play-btn {
    color: #fa2800;
    font-size: 28px;
    display: none;
    text-align: left;
    cursor: pointer;
  }
  .artist-box .artist-table tbody tr .index-container .pause-btn {
    color: #fa2800;
    font-size: 30px;
    display: none;
    text-align: left;
    cursor: pointer;
  }
  .artist-box .artist-table tbody tr .name-container {
    display: flex;
    align-items: center;
  }
  .artist-box .artist-table tbody tr .name-container .avatar {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    flex-shrink: 0;
    margin-right: 10px;
  }
  .artist-box .artist-table tbody tr .name-container .avatar img {
    width: 100%;
    border-radius: 5px;
  }
  .artist-box .artist-table tbody tr .duration-container {
    text-align: right;
    padding-right: 15px;
    position: relative;
  }
  .artist-box .artist-table tbody tr .duration-container p {
    padding-right: 10px;
  }
  .artist-box .artist-table tbody tr .duration-container .song-tools {
    display: flex;
    justify-content: flex-end;
    top: 50%;
    margin-top: -25px;
    right: 10px;
    position: absolute;
    display: none;
  }
  .artist-box .artist-table tbody tr .duration-container .song-tools i {
    flex-shrink: 0;
    cursor: pointer;
    margin-right: 15px;
    font-size: 20px;
  }
  /* 隔一行颜色一样 */
  .artist-box .artist-table tbody tr:nth-child(2n) {
    background: #f7f7f7;
  }
  .artist-box .artist-table tbody tr .playing p {
    color: #fa2800;
  }
  .artist-box .artist-table tbody tr .playing i {
    color: #fa2800;
  }
  .artist-box .artist-table tbody tr .playing .index-container .num {
    display: none;
  }
  .artist-box .artist-table tbody tr .playing .index-container .play-icon {
    display: flex;
  }
  .artist-box .artist-table tbody tr .playing .index-container .play-btn {
    display: none;
  }
  .artist-box .artist-table tbody tr:hover {
    /* CSS伪类，鼠标悬停，变色 */
    background: #e8e9ed;
  }
  .artist-box .artist-table tbody tr:hover playing .index-container .play-btn {
    display: none;
  }
  .artist-box .artist-table tbody tr:hover playing .index-container .play-icon {
    display: none;
  }
  .artist-box .artist-table tbody tr:hover playing .index-container .pause-btn {
    display: block;
  }
  .artist-box .artist-table tbody tr:hover .index-container .num {
    display: none;
  }
  .artist-box .artist-table tbody tr:hover .index-container .play-btn {
    display: block;
  }
  .artist-box .artist-table tbody p {
    cursor: pointer;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>