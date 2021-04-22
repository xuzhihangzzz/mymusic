<template>
  <div class="playlist-detail container">
    <div class="left shadow">
      <div class="top">
        <div class="avatar">
          <img v-lazy="detail.coverImgUrl + '?param=200y200'" alt="" />
        </div>
        <div class="info">
          <div class="title flex-between">
            <span>{{ detail.name }}</span>
            <div></div>
          </div>
          <div class="user flex-row">
            <div class="avatar" @click="toUser(creator.userId)">
              <img v-lazy="creator.avatarUrl + '?param=100y100'" alt="" />
            </div>
            <p class="nickname" @click="toUser(creator.userId)">{{ creator.nickname }}</p>
            <p class="createTime" v-if="detail.createTime"> 
              {{ dateFormat(detail.createTime) }}创建
            </p>
          </div>
          <div class="tag flex-row" v-if="detail.tags && detail.tags.length > 0">
            标签：
            <a v-for="item of detail.tags" :key="item" @click="tag(item)">
              {{ item }}
            </a>
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span
              @click="openDesc(detail.name, detail.description)"
              class="flex-row"
              v-if="txtLength(detail.description) > 50"
              >全部<i
                class="iconfont iconright"
              ></i
            ></span>
          </div>
        </div>
      </div>
      <div class="content" v-loading="loading">
        <songs-of-song-list
          :songs="songs"
          :isPerson="ordered ? true : false"
          @collectArtist="collectArtist"
          :subscribed="detail.subscribed"
        />
      </div>
    </div>
    <div class="right">
      <div class="like module shadow">
        <div class="card-header flex-row">
          <span>喜欢这个歌单的人</span>
        </div>
        <ul v-if="subscribers.length > 0">
          <li v-for="item of subscribers" :key="item.userId">
            <div style="cursor:pointer;" class="avatar" @click="toUser(item.userId)">
              <img
                v-lazy="item.avatarUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px;">还没有人喜欢</p>
      </div>
      <!-- 推荐歌单 -->
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li
            v-for="item of relatedList"
            :key="item.id"
            @click="toDetail(item.id)"
          >
            <div class="avatar">
              <img
                v-lazy="item.coverImgUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
            <div class="info">
              <h2 class="ellipsis" :title="item.name">{{ item.name }}</h2>
              <span
                >By. <small> {{ item.creator.nickname }}</small></span
              >
            </div>
          </li>
        </ul>
      </div>
      <!-- 评论 -->
      <div class="comment module shadow">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul v-if="comments.length > 0">
          <li class="item" v-for="item of comments" :key="item.time">
            <div class="avatar" @click="toUser(item.user.userId)">
              <img
                v-lazy="item.user.avatarUrl + '?param=150y150'"
                :alt="item.user.nickname"
                :title="item.user.nickname"
              />
            </div>
            <div class="info">
              <h2 @click="toUser(item.user.userId)">
                {{ item.user.nickname}}
                <small> · {{ formatMsgTime(item.time) }}</small>
              </h2>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px;">还没有人评论</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { createSong } from 'model/song.js'
  import SongsOfSongList from 'components/common/SongsOfSongList'
  import utils from 'utils/utils.js'
  import {getPlayListDetail,
          getSongDetail,
          getRelatedPlaylist,
          getSubscribersPlaylist,
          getCommentPlaylist,
          collectPlaylist} from 'network/songlist.js'
  export default {
    data() {
      return {
        // 歌单详情
        detail: {},
        // 歌单创建者信息
        creator: {},
        // 收藏这个歌单的人
        subscribers: [],
        // 相关歌单
        relatedList: [],
        // 相似歌单
        simiList: [],
        // 评论
        comments: [],
        // 歌曲列表
        songs: [],
        // 收藏这个歌单的人数量
        s: 32,
        artistId: '',
        loading: false,
        // 是否是我喜欢的歌单
        ordered: false
      }
    },
    components: {
      SongsOfSongList
    },
    computed: {
      txtLength() {
        return function(txt) {
          if (txt) {
            return txt.length
          }
        }
      }
    },
    watch: {
      $route(newId, oldId) {
        let id = this.$route.query.id || this.singer.id
        if (id) {
          this._initialize(id)
        }
      }
    },
    methods: {
      formatMsgTime(time) {
        return utils.formatMsgTime(time)
      },
      dateFormat(createTime) {
        return utils.dateFormat(createTime, 'YYYY-MM-DD')
      },
      // 标签跳转
      tag(cat) {
        this.$router.push({
          path: '/songlist',
          query: {
            cat
          }
        })
      },
      // 获取歌单详情
      getPlayListDetail(id, s) {
        let timestamp = new Date().valueOf()
        // let res = await this.$api.getPlayListDetail(id, s, timestamp)
        getPlayListDetail(id, s, timestamp).then(res => {
          if (res.code === 200) {
            if(res.playlist.description !== null) {
              res.playlist.description = res.playlist.description.replace(
                /(\r\n|\n|\r)/gm,
                '<br />'
              )
            }
            this.detail = res.playlist
            this.creator = res.playlist.creator
            let trackIds = res.playlist.trackIds
            // 数量超过一千，进行分割
            let arrLength = 1000
            let sliceArr = []
            for (let i = 0; i < trackIds.length; i += arrLength) {
              sliceArr.push(trackIds.slice(i, i + arrLength))
            }
            this.getSongDetail(sliceArr)
          }
        })
      },
      // 获取该歌单下的歌曲列表
      getSongDetail(sliceArr) {
        this.loading = true
        let before = sliceArr[0]
        let after = sliceArr[1]
        let timestamp = new Date().valueOf()
        let beforeIds = []
        let afterIds = []
        before.map(item => {
          beforeIds.push(item.id)
        })
        beforeIds = beforeIds.join(',')
        if (after) {
          after.map(item => {
            afterIds.push(item.id)
          })
          afterIds = afterIds.join(',')
        }
    
        if (after) {
          getSongDetail(beforeIds, timestamp).then(res => {
            getSongDetail(afterIds, timestamp + 1).then(res2 => {
              this.songs = this._normalizeSongs(res.songs.concat(res2.songs))
            })
          })
        } else {
          getSongDetail(beforeIds, timestamp).then(res => {
            this.songs = this._normalizeSongs(res.songs)
          })
        }
        this.loading = false 
      },

      // 获取相关歌单推荐
      getRelatedPlaylist(id) {
        getRelatedPlaylist(id).then(res => {
            if (res.code === 200) {
            this.relatedList = res.playlists
          }
        })
      },

      // 获取歌单收藏者
      getSubscribersPlaylist(id) {
        getSubscribersPlaylist(id,28,0).then(res => {
          if (res.code === 200) {
            this.subscribers = res.subscribers
          }
        })
      },
      // 获取评论
      getCommentPlaylist(id) {
        getCommentPlaylist(id,28,0).then(res => {
          if (res.code === 200) {
            if (res.hotComments.length > 0) {
              this.comments = res.hotComments
            } else {
              this.comments = res.comments
            }
          }
        })
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
      },

      // 打开歌单介绍详情
      openDesc(title, content) {
        this.$alert(content, title, {
          closeOnClickModal: true,
          customClass: 'descBox',
          showConfirmButton: false,
          dangerouslyUseHTMLString: true
        })
      },
      // 收藏歌单
      async collectArtist() {
        let t = this.detail.subscribed ? 2 : 1
        let message = this.detail.subscribed ? '已取消收藏' : '收藏成功'
        try {
          let res = await collectPlaylist(t, this.artistId)
          if (res.code === 200) {
            this.$message({
              message,
              type: 'success'
            })
            setTimeout(() => {
              this.getPlayListDetail(this.artistId, 100)
            }, 300)
          }
        } catch (error) {
        }
      },
      // 跳转到推荐的歌单
      toDetail(id) {
        this.$router.push({
          path: '/playlist/detail',
          query: {
            id
          }
        })
      },
      toUser(id) {
        this.$router.push({
          path: '/user',
          query: {
            id
          }
        })
      },
      // 初始化
      _initialize(id) {
        this.getPlayListDetail(id, 100)
        this.getRelatedPlaylist(id)
        this.getSubscribersPlaylist(id)
        this.getCommentPlaylist(id)
      }
    },
    mounted() {
      window.scroll(0, 0);
      let id = this.$route.query.id
      this.artistId = id
      if (id) {
        this._initialize(id)
      }
    }
  }
</script>
<style scoped>
  @import "http://at.alicdn.com/t/font_2286501_7kv112w97p4.css";
  ol, ul, li {
    list-style-type:none;
  }
  .container {
    min-height: calc(100vh - 252px);
    min-width: 1024px;
    max-width: 1380px;
    width: 100%;
    padding-top: 90px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .shadow {
    background-color: #fff;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
  }
  .playlist-detail {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
  }
  .playlist-detail .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
  }
  .playlist-detail .left .top {
    display: flex;
  }
  .playlist-detail .left .top .avatar {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    position: relative;
    margin-right: 30px;
    flex-shrink: 0;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: relative;
  }
  .playlist-detail .left .top .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .info .title {
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 20px;
    margin-top: 10px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    justify-content: space-between;
  }
  .info .user {
    margin-bottom: 15px;
  }
  .playlist-detail .left .top .info .user .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    position: relative;
    margin-right: 15px;
    cursor: pointer;
  }
  .playlist-detail .left .top .info .user .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
  }
  .nickname {
    font-size: 14px;
    margin-right: 30px;
    cursor: pointer;
  }
  .createTime {
    font-size: 14px;
    color: grey;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-column, .flex-row {
    display: flex;
    align-items: center;
  }
  .playlist-detail .left .top .info .tag a {
    color: #fff;
    background: #fa2800;
    margin-right: 15px;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 15px;
  }
  .playlist-detail .left .top .info .desc {
    display: flex;
    flex-direction: column;
    line-height: 1.6;
    margin-top: 15px;
  }
  .playlist-detail .left .top .info .desc p {
    line-height: 1.6;
    font-weight: 400;
    flex: 1;
    font-size: 14px;
  }
  .ellipsis-two {
    /* 只显示两行 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: 700;
    line-height: 18px;
  }
  .playlist-detail .left .top .info .desc span {
    flex-shrink: 0;
    color: #fa2800;
    cursor: pointer;
  }
  .playlist-detail .left .content {
    margin-top: 20px;
  }
  .playlist-detail .right {
    width: 350px;
    flex-shrink: 0;
  }
  .playlist-detail .right .like {
    padding-bottom: 5px;
  }
  .playlist-detail .right .module {
    padding: 15px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .playlist-detail .right .card-header {
    border-left: 3px solid #fa2800;
    height: 20px;
    padding-left: 1rem;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .playlist-detail .right .like ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
  }
  .playlist-detail .right .like ul li {
    flex: 0 0 14.285714285714%;
    max-width: 14.285714285714%;
    padding: 0 5px 10px;
  }
  .playlist-detail .right .like ul li .avatar, .playlist-detail .right .like ul li .avatar img {
    width: 100%;
    border-radius: 3px;
  }
  .playlist-detail .right .related {
    padding-bottom: 5px;
  }
  .playlist-detail .right .related ul li {
    display: flex;
    margin-bottom: 15px;
    cursor: pointer;
  }
  .playlist-detail .right .related ul li .avatar {
    width: 50px;
    height: 50px;
    border-radius: 3px;
    margin-right: 15px;
    flex-shrink: 0;
  }
  .playlist-detail .right .related ul li .avatar img {
    width: 100%;
    border-radius: 3px;
  }
  .playlist-detail .right .related ul li .info {
    height: 50px;
    width: calc(100% - 60px);
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .playlist-detail .right .related ul li .info h2 {
    font-size: 14px;
    margin-bottom: 10px;
    width: 100%;
  }
  .playlist-detail .right .related ul li .info span {
    font-size: 12px;
    color: #a5a5c1;
  }
  .playlist-detail .right .module {
    padding: 15px;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .playlist-detail .right .comment ul li {
    padding: 10px 0;
    width: 100%;
    display: flex;
  }
  .playlist-detail .right .comment ul li .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .playlist-detail .right .comment ul li .avatar img {
    width: 100%;
    border-radius: 50%;
  }
  .playlist-detail .right .comment ul li .info {
    flex: 1;
  }
  .playlist-detail .right .comment ul li .info h2 {
    font-size: 15px;
    margin-right: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .playlist-detail .right .comment ul li .info h2 small {
    font-size: 12px;
    color: #a5a5c1;
    font-weight: 200;
  }
  .playlist-detail .right .comment ul li .info p {
    width: 100%;
    font-size: 12px;
    color: #666666;
    line-height: 1.6;
    padding: 5px 10px;
    background: #f5f5f5;
    margin-top: 5px;
    border-radius: 3px;
  }
  .playlist-detail .right .card-header {
    border-left: 3px solid #fa2800;
    height: 20px;
    padding-left: 1rem;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .playlist-detail .right .card-header .icon-like {
    font-size: 20px;
  }
</style>