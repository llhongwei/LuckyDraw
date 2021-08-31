import Vue from 'vue'
import App from './App.vue'
import {
  Button,
  Card,
  Dialog,
  Drawer,
  Form,
  FormItem,
  Input,
  InputNumber,
  Loading,
  Message,
  MessageBox,
  Switch,
  Table,
  TableColumn,
  Upload
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.use(Card)
Vue.use(Upload)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Drawer)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
