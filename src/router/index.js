import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Index from '@/components/Index'
// 商品详情
import Detail from '@/components/Detail'
// 产业带 分类
import Belts from '@/components/Belts'
// 产业带
import Belt from '@/components/Belt'
// 特色专场
import Origin from '@/components/Origin'
// 评价
import Evaluation from '@/components/Evaluation'
// 商家注册
import Busregist from '@/components/Busregist'

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
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/evaluation',
      component: Evaluation
    },
    {
      path: '/busregist',
      component: Busregist
    }
  ]
})
