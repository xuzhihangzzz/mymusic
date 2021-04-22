<template>
  <div class="login">
    <login-box>
    </login-box>
  </div>
</template>

<script>
  import LoginBox from './childComps/LoginBox'
  export default {
    name: 'Login',
    components: {
      LoginBox
    },
    mounted() {
      window.scroll(0, 0);
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 45px;
    /* color: #fff; */
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 4px;
    text-align: center;
    padding: 1em 0 0.4em 0;
  }
  .login {
    width: 100%;
    min-height: 100vh;
    display: flex;
    /* 项目在主轴上的对齐方式 */
    justify-content: center;
    /* 项目在交叉轴上的对齐方式 */
    align-items: center;
    background-image: url("../../assets/img/bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
</style>
