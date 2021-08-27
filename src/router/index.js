import Vue from 'vue'
import VueRouter from 'vue-router'
import TopBar from '@/view/TopBar/index.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TopBar,
    redirect: '/luckyDraw',
    children: [
      {
        path: '/luckyDraw',
        name: 'LuckyDraw',
        component: () => import('@/view/luckyDraw/index')
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/view/login/index')
      },
    ]
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
