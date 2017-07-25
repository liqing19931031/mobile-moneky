import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Index from '@/components/Index'

// 产业带
import Belts from '@/components/Belts'
import Belt from '@/components/Belt'
import Origin from '@/components/Origin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/belts',
      component: Belts
    },
    {
      path: '/belt',
      component: Belt
    },
    {
      path: '/origin',
      component: Origin
    }
  ]
})
