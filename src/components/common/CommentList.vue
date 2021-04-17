<template>
  <div class="comment-list">
    <h3>{{title}}</h3>
    <ul>
      <li class="item" v-for="item in commentList" :key="item.commentId">
        <!-- 头像 -->
        <div class="avatar">
          <img :src="item.user.avatarUrl" :alt="item.user.nickname" :title="item.user.nickname">
        </div>
        <!-- 信息，操作 -->
        <div class="info">
          <h2 class="info-header">
            <span>{{item.user.nickname}}<small>{{formatMsgTime(item.time)}}</small></span>
            <div class="tool">
              <i class="iconfont zan iconzan"></i>
              <span>({{item.likedCount}})</span>
              <i class="iconfont i-comment iconcomments"></i>
            </div>
          </h2>
          <!-- 评论内容 -->
          <div class="content">
            {{item.content}}
            <!-- 被回复的评论 -->
            <div
              class="beReqlied"
              v-for="subItem of item.beReplied"
              :key="subItem.beRepliedCommentId"
            >
              <small>@{{ subItem.user.nickname }}：</small>{{ subItem.content }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import utils from 'utils/utils.js'
  export default {
    name: 'CommentList',
    data() {
      return {
        commentContent: []
      }
    },
    props: {
      title: {
        type: String
      },
      commentList: {
        type: Array
      },
      currentCommentId: {
        type: [String, Number]
      }
    },
    components: {

    },
    methods: {
      formatMsgTime(time) {
        return utils.formatMsgTime(time)
      }
    },
    mounted() {
      // console.log('1231')
      // console.log(this.commentList)
    }
  }
</script>

<style scoped>
  .comment-list {
    margin-top: 20px;
  }
  .comment-list h3 {
    margin-bottom: 15px;
    font-size: 16px;
  }
  .comment-list ul li {
    padding: 10px 0;
    width: 100%;
    display: flex;
  }
  li .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
    flex-shrink: 0;
  }
  li .avatar img {
    width: 100%;
    border-radius: 50%;
  }
  li .info {
    flex: 1;
  }
  li .info .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li .info h2 {
    font-size: 15px;
    margin-right: 5px;
    margin-bottom: 10px;
  }
  li .info span {
    color: #4a4a4a;
  }
  li .info h2 small {
    margin-left: 14px;
    font-size: 12px;
    color: #a5a5c1;
    font-weight: 200;
  }
  li .info h2 .tool {
    display: flex;
    align-items: center;
  }
  li .info h2 .tool i {
    font-size: 24px;
    font-weight: 100;
    margin-left: 20px;
    cursor: pointer;
    transition: all 0.4s;
  }
  li .info h2 .tool i .active {
    color: #fa2800;
  } 
  li .info h2 .tool span {
    font-size: 12px;
    margin-top: 2px;
    color: #666;
    font-weight: 200;
    position: relative;
  }
  li .info h2 .tool span:after {
    /* 一根竖着的分隔线 */
    content: "";
    width: 1px;
    height: 13px;
    background: #4a4a4a;
    opacity: 0.7;
    position: absolute;
    top: 2px;
    right: -12px;
  }
  .info .content {
    width: 100%;
    font-size: 12px;
    color: #4a4a4a;
    line-height: 1.6;
    padding: 8px 10px;
    background: #f5f5f5;
    margin-top: 5px;
    border-radius: 3px;
  }
  .info .content .beReqlied {
    margin-top: 10px;
    background: #ffffff;
    padding: 8px 10px;
    border-radius: 3px;
    color: #666666;
  }
  .info .content .beReqlied small {
    color: #fa2800;
  }
  .zan {
    font-size: small !important;
    margin-right: 5px;
  }
  .i-comment {
    color: #5f5c5c
  }
</style>