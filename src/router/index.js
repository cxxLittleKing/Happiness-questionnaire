import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login'
// import Index from '@/components/index'
// import Personal from '@/components/personal'
// import Pay from '@/components/pay'
// import Question from '@/components/question'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component:  resolve => require(['@/components/index'], resolve)
    },
    {
      path: '/personal',
      name: 'personal',
      component:resolve => require(['@/components/personal'], resolve)
    },
    {
      path: '/pay',
      name: 'pay',
      component: resolve => require(['@/components/pay'], resolve)
    },
    {
      path: '/question',
      name: 'question',
      component: resolve => require(['@/components/question'], resolve)
    }
  ]
})

