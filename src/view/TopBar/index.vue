<template>
  <div>
    <div class="top-bar">
      <h1 class="title" title="点我可以回到抽奖页" @click="goLottery">抽奖</h1>
      <div>
        <el-button
            class="message"
            @click="goLogin">
          {{ message }}
        </el-button>
        <el-button v-if="this.islogin" @click="goSetLuckyItem">
          奖品管理
        </el-button>
        <el-button v-if="this.islogin" onclick="sessionStorage.clear();window.location = '/'">
          退出
        </el-button>
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
      message: '登录',
      islogin: false
    }
  },
  methods: {
    goLogin() {
      if (!this.islogin && this.$route.name !== 'Login') {
        this.$router.push('/login')
      }
    },
    goLottery() {
      this.$router.push('/luckyDraw')
    },
    goSetLuckyItem() {
      if (this.$route.name !== 'SetLuckyItem') {
        this.$router.push('/setLuckyItem')
      }
    }
  },
  created() {
    this.$bus.$on('loginSuccess', (userName) => {
      // console.log(userName)
      this.message = userName + ' 您好！'
    })
  },
  updated() {
    const token = sessionStorage.getItem('token')
    this.islogin = token !== null
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
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.message {
  cursor: pointer;
  /*text-decoration: underline;*/
}

.top-bar > div {
  margin-right: 100px;

}
</style>