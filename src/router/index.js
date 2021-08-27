import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LuckyDraw',
    component: () => import('@/view/luckyDraw/index')
  },
  {
    path: '/setLuckyItem',
    name: 'SetLuckyItem',
    component: () => import('@/view/setLuckyDraw/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
