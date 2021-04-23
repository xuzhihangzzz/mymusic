<template>
  <div class="footer-explain">
    <div class="content">
      <div class="info">

        <div class="info-item">
          <div class="item-one">
            <div class="item">
              <img src="~assets/img/wechat.jpg" class="img" alt="" style="width: 110px">
            </div>
          </div>
        </div>
        
        <div class="info-item">
          <h4 class="title">说明</h4>
          <div class="connection">
            <p>无法播放的歌曲为网易云无版权歌曲</p>
            <p>使用Flex弹性布局</p>
            <p>使用vue-infinite-loading实现下拉无限加载</p>
          </div>
        </div>
          
        <div class="info-item">
          <h4 class="title">联系我</h4>
          <div class="connection">
            <p>Email: <a href="mailto:3243419394@qq.com" target="_top">3243419394@qq.com</a></p>
            <p>QQ: 3243419394</p>
            <p>微信: 左侧二维码</p>
            <p>GitHub: <a href="https://github.com/xuzhihangzzz" target="_blank">xuzhihangzzz</a></p>
          </div>
        </div>

        <div class="info-item-big">
          <h4 class="title">MyMusic</h4>
          <p>
            这是我使用vue全家桶+ElementUI写的PC网页端仿网易云音乐SPA项目，
            后端接口来自github开源项目：<a href="https://binaryify.github.io/NeteaseCloudMusicApi/#/" target="_blank">网易云音乐NodeJS版API</a>，欢迎交流讨论...
          </p>
        </div>

      </div>
      <div class="divide"></div>
        <p class="copyright">Copyright &copy; by xuzhihang</p>
      </div>

  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>
<style lang="less" scoped>
  p, a {
    color: rgba(255,255,255,.5);
    font-size: 14px;
    height: 20px;
    text-align: center;
    letter-spacing: 1px !important;
    font-weight: 300 !important;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    color: #FFF;
  }
  h4 {
    text-align: center;
    margin-block-start: 0 !important;
    margin-block-end: 0 !important;
    color: #FFF;

    font-weight: 500;
  }
  .footer-explain {
    margin-top: 20px;
    background-color: #161e27;
    width: 100%;

    padding-top: 4em !important;
    padding-bottom: 2em !important;
  }
  .content {
    max-width: 1380px;
    width: 100%;
    padding-right: 30px;
    padding-left: 30px;
    margin-right: auto;
    margin-left: auto;
  }
  .connection {
    p {
      height: 25px;
    }
  }
  .img {
    border-radius: .3125em;
  }
  .info {
    display: flex;
    align-items: stretch;
  }
  .info-item {
    /* flex: 0 0 18.75%; */
    flex-grow: 1;
    /* 当空间不足时，等比例缩小 */
    flex-shrink: 1;
    /* 在分配多余空间之前，项目占据的主轴空间 */
    flex-basis: 18.75%;
    border-right: 0.5px solid rgba(255,255,255,.1);
  }
  .title{
    padding-bottom: 10px;
  } 
  .info-item-big {
    /* flex: 0 0 43.75%!; */
    flex-grow: 1;
    /* 当空间不足时，不缩小 */
    flex-shrink: 0;
    flex-basis: 43.75%;
  }

  .info-item {
    .item-one {
      padding-left: 40px;
    }
  }
  .divide {
    height: 1px;
    border-bottom: 1px solid rgba(255,255,255,.1);
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .copyright {
    opacity: 0.6 !important;
  }
</style>
