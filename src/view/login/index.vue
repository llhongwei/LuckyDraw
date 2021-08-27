<template>
  <div class="login-form">
    <el-input
      placeholder="请输入用户名"
      v-model="userName"
      clearable
      class="login-form-input"
    >
    </el-input>
    <el-input
      placeholder="请输入密码"
      v-model="pass"
      show-password
      class="login-form-input"
    ></el-input>
    <el-button
      type="primary"
      class="login-form-button"
      @click.native="userLogin"
    >登录</el-button>
  </div>
</template>

<script>
import { userLogin } from '@/network/api';

export default {
  data() {
    return {
      isLogin: true,
      userName: 'admin',
      pass: '123456'
    }
  },
  methods: {
    async userLogin() {
      if (this.userName === '' || this.pass === '') {
        this.$message.error('用户名或密码不能为空！');
      } else {
        const res = await userLogin({ userName: this.userName, pass: this.pass })
        // console.log(res)
        if (res.data.status === 'success') {
          this.$bus.$data.userName = this.userName
          this.$bus.$emit('loginSuccess', this.userName)
          this.$router.push('/luckyDraw')
        } else {
          this.$message.error(res.data.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 200px;
  margin: 0 auto;
}

.login-form-input,
.login-form-button {
  width: 100%;
  margin-top: 20px;
}
</style>