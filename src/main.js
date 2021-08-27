import Vue from 'vue'
import App from './App.vue'
import {MessageBox, Card, Upload} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$alert = MessageBox.alert
Vue.use(Card)
Vue.use(Upload)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
