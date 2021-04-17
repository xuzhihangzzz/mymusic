<template>
  <div class="play-bar" v-show="playList.length > 0">
    <!-- 图片 -->
    <div class="avatar">
      <img :src="currentSong.image" alt="">
    </div>
    <!-- 信息 -->
    <div class="info">
      <h2 class="ellipsis">{{currentSong.name}}</h2>
      <p class="ellipsis">{{currentSong.singer}}</p>
    </div>
    <!-- 控制按钮 -->
    <div class="play-btn">
      <i class="iconfont icon-prev iconshangyishou" @click="prevSong"></i>
      <i class="iconfont iconbofang icon-play" :class="playIcon" @click="togglePlaying"></i>
      <i class="iconfont iconxiayishou icon-next" @click="nextSong"></i>
    </div>
    <div class="progress-wrap" id="progress-wrap">
      <p class="current-time">{{ formatTime(currentTime) }}</p>
      <progress-bar
        :percent="percent"
        @percentChange="onPercentBarChange"
      ></progress-bar>
      <p class="duration-time">
        {{ formatTime(currentSong.duration) }}
      </p>
    </div>
    <!-- 音量控制 -->
    <div class="volume-wrap">
      <i
        class="iconfont iconvolumemedium"
        @click="changeMuted"
        :class="mutedIcon"
      ></i>
      <div class="progress-bar">
        <el-slider
          v-model="volumeNum"
          style="width: 100%;"
          class="bar-inner"
          @change="changeVolume"
          :show-tooltip="false"
        ></el-slider>
      </div>
    </div>
    <div class="tool">
      <i class="iconfont iconci" @click="openLyric"></i>
    </div>
    <audio
      ref="myaudio"
      :src="currentSong.url"
      @playing="audioReady"
      @error="audioError"
      @timeupdate="updateTime"
      @ended="audioEnd"
      @pause="audioPaused"
      :muted="isMuted"
    ></audio>
    <transition name="fade">
      <div class="lyric-box shadow" v-if="showLyric">
        <div class="title flex-between">歌词</div>
        <scroll
          class="lyric"
          ref="lyricList"
          :data="currentLyric && currentLyric.lines"
        >
          <div class="lyric-wrapper">
            <div v-if="currentLyric">
              <p
                ref="lyricLine"
                class="lyric-text"
                :class="currentLyricNum === index ? 'active' : ''"
                v-for="(item, index) of currentLyric.lines"
                :key="index"
              >
                {{ item.txt }}
              </p>
            </div>
            <div class="no-lyric" v-else>暂无歌词，请您欣赏</div>
          </div>
        </scroll>
        <div class="foot"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import ProgressBar from './ProgressBar'
  import Scroll from '../common/Scroll'
  import utils from 'utils/utils'
  // 导入歌词解析器
  import Lyric from 'lyric-parser'
  import {getLyricById} from 'network/songlist.js'

  export default {
    name: 'PlayBar',
    components: {
      ProgressBar,
      Scroll
    },
    data() {
      return {
        songReady: false,
        currentTime: 0,
        currentLyric: null,
        currentLyricNum: 0,
        showLyric: false,
        id: '',
        playingLyric: '',
        isPureMusic: false,
        pureMusicLyric: '',
        isMuted: false,
        volume: 0.5,
        volumeNum: 50
      }
    },
    computed: {
      // 播放暂停按钮
      playIcon() {
        return this.playing ? 'iconzantingtingzhi' : 'iconbofang'
      },
      // 是否静音
      mutedIcon() {
        return this.isMuted ? 'iconjingyin-' : 'iconyinliang'
      },
      // 进度条
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      ...mapGetters([
        'playList',
        'currentSong',
        'playing',
        'currentIndex',
      ])
    },
    watch: {
      // 监听歌曲内容变化
      currentSong(newSong, oldSong) {
        if (!newSong.id || (newSong.id === oldSong.id)) {
          return
        }
        this.songReady = false
        this.canLyricPlay = false
        if (this.currentLyric) {
          this.currentLyric.stop()
          // 重置为null
          this.currentLyric = null
          this.currentTime = 0
          this.playingLyric = ''
          this.currentLyricNum = 0
        }
        this.$nextTick(() => {
          const audio = this.$refs.myaudio
          if (audio) {
            // audio.src = this.getUrl(newSong.id)
            audio.src = newSong.url
            audio.volume = this.volume
            audio.play()
            this.id = newSong.id
          }
        })
        // 获取歌词
        this.getLyric(newSong.id)
        // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.songReady = true
        }, 5000)
      },
      // 监听播放状态flag，实现播放状态转换
      playing(isPlaying) {
        if (!this.songReady) {
          return
        }
        this.$nextTick(() => {
          const audio = this.$refs.myaudio
          if (audio) {
            isPlaying ? audio.play() : audio.pause()
          }
        })
      }
    },
    methods: {
      // 控制静音
      changeMuted() {
        this.$nextTick(() => {
          if (this.isMuted) {
            this.isMuted = false
            this.$refs.myaudio.muted = false
          } else {
            this.isMuted = true
            this.$refs.myaudio.muted = true
          }
        })
      },
      // 改变音量
      changeVolume(e) {
        this.volume = e / 100
        this.$refs.myaudio.volume = e / 100
      },
      // 展开歌词
      openLyric() {
        if (this.showLyric) {
          this.showLyric = false
        } else {
          this.showLyric = true
        }
      },
      // 获取歌词
      getLyric(id) {
        getLyricById(id).then(res => {
          if (res.code === 200) {
            let lyric = res.lrc.lyric
            this.currentLyric = new Lyric(lyric, this.lyricHandle)
            if (this.isPureMusic) {
              const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g
              this.pureMusicLyric = this.currentLyric.lrc
                .replace(timeExp, '')
                .trim()
              this.playingLyric = this.pureMusicLyric
            } else {
              if (this.playing && this.canLyricPlay) {
                this.currentLyric.seek(this.currentTime * 1000)
              }
            }
          }
        }).catch(err => {
          this.currentLyric = null
          this.playingLyric = ''
          this.currentLyricNum = 0
        })
      },
      // 歌词回调
      lyricHandle({ lineNum, txt }) {
        if (!this.$refs.lyricLine) {
          return
        }
        this.currentLyricNum = lineNum
        if (lineNum > 10) {
          let lineEl = this.$refs.lyricLine[lineNum - 10]
          if (this.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricList.scrollToElement(lineEl, 1000)
            })
          }
        } else {
          if (this.$refs.lyricList) {
            this.$nextTick(() => {
              this.$refs.lyricList.scrollTo(0, 0, 1000)
            })
          }
        }
        this.playingLyric = txt
      },
      // 点击播放暂停
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      // 上一首
      prevSong() {
        if (!this.songReady) {
          return
        }
        if (this.playList.length === 1) {
          this.loopSong()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playList.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
      },
      // 下一首
      nextSong() {
        if (!this.songReady) {
          return
        }
        if (this.playList.length === 1) {
          this.loopSong()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playList.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
      },
      // 单曲循环播放
      loopSong() {
        this.$refs.myaudio.currentTime = 0
        this.$refs.myaudio.play()
        this.setPlayingState(true)
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      // 播放准备完成
      audioReady() {
        clearTimeout(this.timer)
        this.songReady = true
        this.canLyricPlay = true
        if (this.currentLyric && !this.isPureMusic) {
          this.currentLyric.seek(this.currentTime * 1000)
        }
      },
      // 歌曲错误
      audioError() {
        clearTimeout(this.timer)
        this.songReady = true
      },
      // 歌曲暂停
      audioPaused() {
        this.setPlayingState(false)
        if (this.currentLyric) {
          this.currentLyric.stop()
        }
      },
      // 歌曲播放完成
      audioEnd() {
        this.currentTime = 0
        this.nextSong()
      },
      // 监听播放时间改变，实时改变currentTime
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      // 进度条拖动改变播放进度
      onPercentBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.currentTime = currentTime
        this.$refs.myaudio.currentTime = currentTime
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      // 重置当前播放歌曲序号
      resetCurrentIndex(list) {
        let index = list.findIndex(item => {
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      // 格式化时间，秒转化为00:00
      formatTime(interval) {
        return utils.formatSecondTime(interval)
      },
      ...mapMutations({
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayList: 'SET_PLAYLIST'
      }),
      ...mapActions([
        'selectPlay',
        'pausePlay'
      ])
    },
    created() {},
    mounted() {}
  }
</script>

<style scoped>
  @import "http://at.alicdn.com/t/font_2286501_7kv112w97p4.css";
  .fade-enter {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  .fade-enter-active {
    transition: all 0.5s;
  }
  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  .fade-leave-active {
    transition: all 0.5s;
  }
  .play-bar {
    width: 100%;
    height: 72px;
    background: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 8000;
    padding: 0 10px 0 20px;
    justify-content: space-between;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 30px;
    flex-shrink: 0;
  }
  .avatar img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    max-width: 100%;
    border-style: none;
  }
  .info {
    margin-right: 15px;
    flex-shrink: 0;
    width: 120px;
  }
  .info h2 {
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
  }
  .info p {
    font-size: 12px;
    color: #999;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .play-btn {
    display: flex;
    align-items: center;
  }
  .icon-prev {
    font-size: 30px;
  }
  .icon-play {
    font-size: 40px;
    margin: 0 10px;
  }
  .icon-next {
    font-size: 30px;
  }
  .progress-wrap {
    width: 650px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 80px;
    flex: 1;
  }
  .play-bar .progress-wrap p {
    font-size: 14px;
  }
  .bar-inner {
    position: absolute;
    top: -18px;
    left: 0;
    display: flex;
    align-items: center;
  }
  .bar-inner .progress {
    width: 0;
    background: #fa2800;
    height: 3px;
    border-radius: 2px;
  }
  .bar-inner .progress-btn {
    position: absolute;
    z-index: 100;
    right: -12px;
    width: 12px;
    height: 12px;
    top: -4.5px;
    background: #fa2800;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.15);
    transition: all .3s;
    border-radius: 50%;
  }
  .volume-wrap {
    width: 180px;
    margin-left: 40px;
    display: flex;
    align-items: center;
    margin-right: 80px;
  }
  .iconvolumemedium {
    font-size: 24px;
    cursor: pointer;
  }
  .volume-wrap .progress-bar {
    position: relative;
    width: 100%;
    flex: 1;
    height: 2px;
    background: rgba(0,0,0,.05);
    border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
  }
  .iconci {
    font-size: 26px;
    margin: 0 15px;
    cursor: pointer;
  }
  .lyric {
    background-color: white;
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 430px;
    overflow: hidden
  }
  .lyric-box {
    width: 360px;
    height: 580px;
    position: absolute;
    right: 0;
    bottom: 80px;
    border-radius: 3px;
    padding: 30px;
    overflow: hidden
  }
  .lyric-box .title {
    margin: 10px 0 30px;
    font-weight: 500;
    font-size: 16px;
  }
  .lyric-box .title i {
    font-size: 20px;
    cursor: pointer;
  }
  .lyric-box .title i:hover {
    color: #fa2800;
  }
  .lyric .lyric-wrapper {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .lyric-text {
    margin: 5px 0;
    line-height: 24px;
    font-size: 14px;
    font-weight: 300;
  }
  .lyric-text .active {
    color: #fa2800;
  }
</style>