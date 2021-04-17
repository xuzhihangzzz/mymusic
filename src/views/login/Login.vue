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
  
</style>
