<template>
  <div class="login-box">
    <!-- logo区域 -->
    <div>
      <div class="img"><img src="~assets/img/logo.png" alt=""></div>
      <p>MyMusic</p>
    </div>
    
    <!-- 登录表单区域 -->
    <el-form ref="formRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login-form">
      <!-- 手机号 -->
      <el-form-item prop="phone">
        <el-input 
        class="form-item" 
        placeholder="请输入登录网易云音乐的手机号" 
        prefix-icon="el-icon-mobile-phone" 
        v-model="loginForm.phone"
        @keyup.enter.native="loginClick"
      >
      </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
         type="password" 
         placeholder="密码" 
         class="form-item" 
         prefix-icon="el-icon-lock" 
         v-model="loginForm.password"
         @keyup.enter.native="loginClick"
        >
        </el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-form-item class="login-btn">
        <el-button type="primary" @click="loginClick">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import { login } from 'network/login'
  import { getUserDetail } from 'network/user'
  import { mapMutations } from 'vuex'
  export default {
    name: 'LoginBox',
    components: {
    },
    data() {
      return {
        loginForm: {
          phone: '',
          password: ''
        },
        // 登录表单验证规则
        loginFormRules: {
          phone: [
            {required:true, message: "请输入网易云音乐登录手机号", tirgger: "blur"},
            {min: 11, max: 11, tirgger: "blur"}
          ],
          password: [
            {required:true, message: "请输入密码", tirgger: "blur"},
            {min: 6, tirgger: "blur"}
          ]
        }
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo: 'SET_USERINFO',
        setLoginStatu: 'SET_LOGINSTATU'
      }),
      loginClick() {
        // 前端验证输入框内容
        this.$refs.formRef.validate(valid => {
          if(!valid) return;
    
          // 符合验证规则再向后端发送登录请求
          login(this.loginForm.phone, this.loginForm.password).then(res => {
            console.log(res)
            if(res.code === 200){
              setTimeout(() => {
                // 使用ElementUI的Message消息提示
                this.$message.success('登录成功')
                // 根据res中的id获取个人信息，并存储在vuex的state中
                this.getUserDetail(res.profile.userId)
                // 将登录成功后的信息保存到相应的sessionStorage中
                window.sessionStorage.setItem('token', res.token)
                window.localStorage.setItem('cookie', res.cookie)
                window.localStorage.setItem('loginStatu', true)
                this.setLoginStatu(true)
                // 登录成功，自动跳转到首页
                this.$router.push('/home')
              }, 700);

            }else {
              // console.log(res)
              // 使用ElementUI的Message显示后端返回的错误信息
              this.$message.error(res.message)
            }
          }).catch(err => {
            console.log(err)
            // 使用ElementUI的Message消息提示
            this.$message.error('登录失败')
          })
        })
      },
      getUserDetail(uid) {
        getUserDetail(uid).then(res => {
          // console.log(res)
          let userInfo = res.profile
          userInfo.level = res.level
          userInfo.listenSongs = res.listenSongs
          userInfo.createTime = res.createTime
          userInfo.createDays = res.createDays
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          // 根据res中的id获取个人信息，并存储在vuex的state中
          this.setUserInfo(res.profile)
          // this.loginLoading = false
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-box {
    overflow: hidden;
    height: 486px;
    position: relative;
    width: 350px;
    max-width: 350px;
    background: #fff;
    background-image: url(~assets/img/loginbg.jpg);
    border-radius: 8px;
    box-shadow: 1px 2px 15px rgba(0,0,0,.3);
    background-repeat: no-repeat;
    background-position: bottom;
    text-align: center;
    -webkit-backface-visibility: hidden;
    transition-property: transform;
    transition-duration: .3s;
    z-index: 80;
    .img {
      width: 55px;
      margin-top: 40px;
      margin-left: auto;
      margin-right: auto;
      img {
        width: 55px;
        height: 55px;
        border-radius: 5px;
      }
    }
    p {
      margin-bottom: 45px;
    }
    .form-item {
      margin-bottom: 22px;
    }
  }
  .login-form {
    width: 296px;
    margin: 0 auto;
  }
  .login-btn button {
    width: 296px;
    margin: 0 auto;
  }
</style>
