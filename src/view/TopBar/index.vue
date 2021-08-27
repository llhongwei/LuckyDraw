<template>
  <div>
    <div class="top-bar">
      <h1 class="title">抽奖</h1>
      <div
        class="message"
        @click="goLogin"
      >
        {{message}}
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '请登录!'
    }
  },
  methods: {
    goLogin(event) {
      if (event.target.innerText === '请登录!' && this.$route.name !== 'Login') {
        this.$router.push('/login')
      }
    }
  },
  created() {
    this.$bus.$on('loginSuccess', (userName) => {
      // console.log(userName)
      this.message = userName + '您好！'
    })
  }
}
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;
  width: 1060px;
  height: 80px;
  background-color: rgb(26, 83, 238);
  border-radius: 5px;
  margin: 0 auto;
}

.title {
  padding-left: 100px;
}

.message {
  margin-right: 100px;
  cursor: pointer;
  text-decoration: underline;
}
</style>