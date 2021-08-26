import Vue from 'vue'
import App from './App.vue'
import { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$alert = MessageBox.alert

new Vue({
  render: h => h(App),
}).$mount('#app')
