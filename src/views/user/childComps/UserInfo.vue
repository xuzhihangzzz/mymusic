<template>
  <div class="info-container">
    <div class="card">
      <div class="avatar">
        <img :src="userProfile.avatarUrl" />
      </div>
    </div>

    <div class="profile">
      <div class="info">
        <p class="name">{{ userProfile.nickname }}</p>
      </div>
      <div class="tag">
        等级：
        <p>Lv {{ userDetail.level }}</p>
      </div>
      <div class="tag">
        年龄：
        <span>{{ age }}周岁</span>
        <i
          v-if="userProfile.gender === 1"
          class="iconfont iconmale-01 sex-icon men"
        ></i>
        <i
          v-if="userProfile.gender === 2"
          class="iconfont iconfemale sex-icon women"
        ></i>
      </div>
      
    </div>
    <div class="right">
      <ul class="follow">
        <li>动态<span>{{ userProfile.eventCount }}</span></li>
        <li>关注<span>{{ userProfile.newFollows }}</span></li>
        <li>粉丝<span>{{ userProfile.followeds }}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import utils from 'utils/utils'
  export default {
    name: 'UserInfo',
    props: {
      userDetail: {
        type: Object,
        default() {
          return {}
        }
      },
      userProfile: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      age() {
        let newDate = new Date()
        newDate.setTime(this.userInfo.birthday)
        let birthday = newDate.toLocaleDateString(this.userInfo.birthday)
        let birthdayArr = birthday.split('/')
        let year = birthdayArr[0]
        let month = birthdayArr[1]
        let day = birthdayArr[2]
        let strBirthday = year + '-' + month + '-' + day
        return utils.getAge(strBirthday)
      }
    },
  }
</script>

<style lang="css" scoped>
  @import "http://at.alicdn.com/t/font_2286501_7kv112w97p4.css";
  .info-container {
    z-index: 100;
    margin-bottom: 35px;
    margin-left: 15px;
    margin-right: 15px;
    box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .card {
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 15px 0 15px;
  }
  .card .avatar {
    width: 98px;
    height: 98px;
    flex-shrink: 0;
    z-index: 2;
    position: relative;
  }
  .card .avatar img {
    width: 98px;
    height: 98px;
    border-radius: 3px;
  }
  .profile .info {
    width: 100%;
    margin-left: 15px;
  }
  .profile .info .name {
    font-weight: 600;
    font-size: 16px;
  }
  .profile {
    padding-left: 33px;
    padding-right: 75px;
    margin-top: 10px;
  }
  .profile .tag {
    position: relative;
    font-size: 13px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  .profile .tag .sex-icon {
    font-size: 14px;
    margin-left: 5px;
  }
  .profile .tag .men {
    color: #4192eb;
  }
  .profile .tag .women {
    color: #f4606c;
  }
  .profile .tag .area-icon {
    font-size: 12px;
    margin-right: 5px;
  }
  .profile .tag span {
    font-size: 13px;
  }
  .profile .tag::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #409eff;
    position: absolute;
    top: 50%;
    left: 0px;
    margin-top: -3px;
  }
  .right {
    width: 300px;
  }
  .follow {
    list-style: none;
    display: flex;
  }
  .follow li {
    text-align: center;
    font-size: 14px;
    color: #958ebb;
    margin-right: 30px;
  }
  .follow li span {
    display: block;
  }
</style>