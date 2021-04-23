<template>
  <div class="mv-detail container">
    <div class="left shadow">
      <div class="video-content" v-loading="loading">
        <video
          :src="videoUrl"
          controls="controls"
          autoplay
          controlslist="nodownload"
        ></video>
      </div>
      <div class="video-foot">
        <h2 class="title flex-row">
          <i class="iconfont"></i>
          {{ detail.name }}
        </h2>
        <div class="tag">
          <a v-for="item of detail.videoGroup" :key="item.id"
            >#{{ item.name }}</a
          >
        </div>
        <p class="flex-row">
          <span
            >发布：{{dateFormat(detail.publishTime)}}</span
          >
          <span v-if="detail.playCount"
            >播放次数：{{ tranNumber(detail.playCount) }}</span
          >
        </p>
      </div>

      <!-- 评论 -->
      <div class="comments">
        <div class="title flex-row">
          <span class="noticom"
            ><a>{{ videoDetailInfoCount.commentCount }} 条评论</a>
          </span>
        </div>
        <comment-list
          v-if="hotComments.length > 0"
          title="精彩评论"
          :commentList="hotComments"
          :currentCommentId="currentCommentId"
          @commentHandle="commentHandle"
          @cancelComment="cancelComment"
          @commentSubmit="commentSubmit"
          @commentLike="commentLike"
        />
        <comment-list
          title="最新评论"
          :commentList="comments"
          :currentCommentId="currentCommentId"
          @commentHandle="commentHandle"
          @cancelComment="cancelComment"
          @commentSubmit="commentSubmit"
          @commentLike="commentLike"
        />
      </div>
    </div>
    
    <div class="right">
      <!-- 视频简介 -->
      <div class="introduce module shadow">
        <div class="card-header flex-row">
          <span>视频简介</span>
        </div>
        <div class="content">
          <p v-if="detail.desc">{{ detail.desc }}</p>
          <p v-else>视频暂无简介</p>
        </div>
      </div>

      <!-- 推荐视频 -->
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li v-for="item of relatedList" :key="item.vid" @click="intoMvDetail(item.id)">
            <div class="avatar">
              <img v-lazy="item.cover + '?param=320y180'" :alt="item.name" :title="item.name" />
            </div>
            <div class="info">
              <h2 class="flex-row ellipsis">
                <i class="iconfont"></i> {{ item.name }}
              </h2>
              <div class="author">
                By  <span v-for="author of item.artists" :key="author.id"
                  ><small> {{ author.name }}</small></span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentList from 'components/common/CommentList'
  import { createSong } from 'model/song.js'
  import utils from 'utils/utils.js'
  import {getMvUrl,
          getMvDetail,
          getMvDetailInfoCount,
          getMvRelated,
          getMvComments
        } from 'network/mv.js'
  export default {
    data() {
      return {
        // MV详情
        detail: {},
        // 相关推荐视频
        relatedList: [],
        // 精彩评论
        hotComments: [],
        // 评论
        comments: [],
        currentCommentId: '',
        videoUrl: '',
        // 当前评论页码
        currentPage: 0,
        // 评论数量,默认为 20
        limit: 20,
        // 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值
        offset: 0,
        // 视频Id
        videoId: '',
        commentTotal: 0,
        // 是否清空评论框内容
        clearContent: false,
        // mv点赞转发评论的数量
        videoDetailInfoCount: {},
        // 是否在加载中
        loading: false
      }
    },
    components: {
      CommentList
    },
    watch: {
      // 检测路由变化，进行页面跳转
      $route(newId, oldId) {
        let id = this.$route.query.id
        if (id) {
          this._initialize(id)
        }
      }
    },
    methods: {
      dateFormat(date) {
        return utils.dateFormat(date, 'YYYY-MM-DD')
      },
      tranNumber(playCount) {
        return utils.tranNumber(playCount ,1)
      },
      formatMsgTime(time) {
        return utils.formatMsgTime(time)
      },
      // 改变每页条数
      handleSizeChange(val) {
        this.limit = val
        this.offset = this.limit * this.currentPage
        this.getMvComments(this.videoId)
      },
      // 改变当前页码
      handleCurrentChange(val) {
        this.currentPage = val
        this.offset = (val - 1) * this.limit
        this.getMvComments(this.videoId)
      },
      // 点击评论
      commentHandle(id) {
        this.currentCommentId = id
      },
      // 提交评论
      commentSubmit(content) {
        if (!content) {
          // this.$message.error('什么都没写，你点毛')
          return
        } else {
          let timestamp = new Date().getTime()
          let params = {
            type: 1,
            id: this.videoId,
            content: content,
            timestamp
          }
          if (this.currentCommentId == '') {
            // 发布评论
            params.t = 1
          } else {
            // 回复评论
            params.t = 2
            params.commentId = this.currentCommentId
          }
        }
      },
      // 取消评论
      cancelComment() {
        this.currentCommentId = ''
      },
    // 评论点赞
    async commentLike(id, liked) {
      let timestamp = new Date().getTime()
      let params = {
        id: this.videoId,
        cid: id,
        type: 1,
        timestamp
      }
      if (liked) {
        params.t = 0
      } else {
        params.t = 1
      }
      try {
        let res = await this.$api.likeComment(params)
        if (res.code === 200) {
          this.getMvComments(this.videoId)
        }
      } catch (error) {
        console.log(error)
      }
    },
      // 获取mv播放地址
      async getMvUrl(id) {
        try {
          let res = await getMvUrl(id)
          if (res.code === 200) {
            this.videoUrl = res.data.url
          }
        } catch (error) {
          console.log(error)
        }
      },
      // 标签跳转
      tag(cat) {
        this.$router.push({
          path: '/playlist',
          query: {
            cat
          }
        })
      },

      // 获取mv详情
      async getMvDetail(id) {
        this.loading = true
        try {
          let res = await getMvDetail(id)
          if (res.code === 200) {
            // console.log(res.data)
            res.data.videoGroup.map(item => {
              // 删除name里存在的'#'
              if (item.name.indexOf('#') != -1) {
                item.name = item.name.replace(/#/g, '')
              }
            })
            this.detail = res.data
          }
        } catch (error) {
          console.log(error)
        }
        this.loading = false
      },
      // 获取该mv点赞转发评论的数量
      async getMvDetailInfoCount(id) {
        try {
          let res = await getMvDetailInfoCount(id)
          if (res.code === 200) {
            let counts = {
              isLike: res.liked,
              likeCount: res.likedCount,
              shareCount: res.shareCount,
              commentCount: res.commentCount
            }
            this.videoDetailInfoCount = counts
          }
        } catch (error) {
          console.log(error)
        }
      },
      // 获取相关推荐mv
      async getMvRelated(id) {
        try {
          let res = await getMvRelated(id)
          if (res.code === 200) {
            this.relatedList = res.mvs
          }
        } catch (error) {
          console.log(error)
        }
      },
      // mv评论
      async getMvComments(id) {
        let timestamp = new Date().getTime()
        try {
          let res = await getMvComments(id, this.limit, this.offset, timestamp)
          if (res.code === 200) {
            this.commentTotal = res.total
            if (res.hotComments) {
              // 精彩评论
              this.hotComments = res.hotComments
            } else {
              this.hotComments = []
            }
            this.comments = res.comments
            console.log(this.comments)
          }
        } catch (error) {
          console.log(error)
        }
      },
      // 跳转到推荐的视频
      intoMvDetail(id) {
        this.$router.push({
          path: '/mv/detail',
          query: {
            id
          }
        })
      },
      // 初始化
      _initialize(id) {
        this.getMvUrl(id)
        this.getMvDetail(id)
        this.getMvDetailInfoCount(id)
        this.getMvRelated(id)
        this.getMvComments(id)
      }
    },
    mounted() {
      window.scroll(0, 0);
      let id = this.$route.query.id
      if (id) {
        this.videoId = id
        this._initialize(id)
      }
    }
  }
</script>
<style lang="less" scoped>
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
  .mv-detail {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    .left {
      flex: 1;
      width: 950px;
      padding: 15px;
      border-radius: 8px;
      margin-right: 20px;
      .top {
        display: flex;
      }
      .video-content {
        position: relative;
        padding-top: 56.25%;
        video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #000;
        }
      }
      .comments {
        margin-top: 25px;
        .title {
          width: 100%;
          height: 50px;
          border-radius: 3px;
          padding: 0 3px;
          border-bottom: 1px solid #f1f1f1;
        }
        span {
          a {
            color: #161e27;
          }
        }
      }
    }
    .right {
      width: 350px;
      flex-shrink: 0;
      .module {
        padding: 15px;
        width: 100%;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .card-header {
        border-left: 3px solid #fa2800;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-column, .flex-row {
    display: flex;
    align-items: center;
  }
  .video-foot {
    margin-top: 12px;
    h2 {
      font-size: 16px;
    }
    .tag {
      margin-top: 12px;
      margin-bottom: 12px; 
      a {
        font-size: 12px;
        color: #fa2800;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    p {
      span {
        margin-right: 30px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .related {
    padding-bottom: 5px;
    ul {
      li {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        .avatar {
          width: 100%;
          margin-right: 15px;
          flex-shrink: 0;
          position: relative;
          img {
            cursor:pointer;
            width: 100%;
          }
          .action {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            .play {
              width: 32px;
              height: 32px;
              padding: 0;
              border: none;
              border-radius: 50%;
              color: #fff;
              cursor: pointer;
              background-color: #fa2800;
              i {
                font-size: 12px;
              }
            }
          }
        }
        .info {
          height: 50px;
          width: calc(100% - 50px);
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          h2 {
            font-size: 14px;
            margin-bottom: 3px;
            margin-top: 5px;
            width: 100%;
            min-height: 20px;
            i {
              color: #fa2800;
              font-size: 24px;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .author {
    font-size: 12px;
    color: #a5a5c1;
    span {
      font-size: 12px;
      color: #a5a5c1;
    }
  }
</style>