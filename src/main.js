import Vue from 'vue'
import App from './App.vue'
import { MessageBox, Card, Upload, Message, Input, Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$message = Message
Vue.use(Card)
Vue.use(Upload)
Vue.use(Input)
Vue.use(Button)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
