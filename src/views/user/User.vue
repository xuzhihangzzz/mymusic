<template>
  <div class="rank">
    <div class="top-bg"></div>
    <div class="wrap">
      <user-info :user-detail="userDetail" :user-profile="userProfile"></user-info>
      <rank-and-user-lists :title="createTitle" :lists="createLists"></rank-and-user-lists>
      <rank-and-user-lists :title="collectTitle" :lists="collectLists"></rank-and-user-lists>
    </div>
  </div>
</template>
<script>
  import UserInfo from './childComps/UserInfo'
  import RankAndUserLists from 'components/content/RankAndUserLists'
  import { 
    getUserDetail, 
    getUserLists
  } from 'network/user.js'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    name: 'Search',
    data() {
      return {
        createTitle: '',
        collectTitle: '',
        createLists: [],
        collectLists: [],
        userDetail: {},
        userProfile: {}
      }
    },
    components: {
      UserInfo,
      RankAndUserLists,
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    watch: {
      $route(newVal, oldVal) {
        // console.log(newVal.query.id)
        // url中id变了，根据url中的id查询数据
        if(newVal.query.id) {
          this.getDetail(newVal.query.id)
        } else {
          this.getDetail(this.userInfo.userId)
        }
        this._initialize()
      }
    },
    methods: {
      getDetail(uid) {
        getUserDetail(uid).then(res => {
          console.log(res)
          this.userDetail = res
          this.createTitle = res.profile.nickname + ' 创建的歌单'
          this.collectTitle = res.profile.nickname + ' 收藏的歌单'
          this.userProfile =  res.profile
          this._initialize()
        })
      },
      // 获取用户歌单
      getUserSongLists() {
        getUserLists(this.userProfile.userId).then(res => {
          // console.log(res)
          let list = res.playlist
          let myList = []
          let collectList = []
          // 对歌单进行归类
          list.map(item => {
            if (item.userId === this.userProfile.userId) {
              myList.push(item)
            } else {
              collectList.push(item)
            }
          })
          this.createLists = myList
          this.collectLists = collectList
        })
      },
      // 初始化
      _initialize() {
        this.getUserSongLists();
      }
    },
    mounted() {
      window.scroll(0, 0);
      // url中有id，根据url中的id查询，数据保存在userDetail中，没有就根据登录用户的id查询
      let userid = this.$route.query.id
      if(userid) {
        this.getDetail(userid)
      } else {
        this.getDetail(this.userInfo.userId)
      }
    }
  }
</script>
<style lang="less" scoped>
  .rank {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
  }
  .top-bg {
    width: 100%;
    height: 250px;
    background: url(../../assets/img/result.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;

    position: relative;
  }
  .wrap {
    max-width: 1380px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>