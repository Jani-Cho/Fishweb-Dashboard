import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/Admin'
import Portfolio from '@/components/Portfolio'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [

    {
      path: '/',
      name: 'Home',
      component: Home,

    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,

    },
    {
      path: '/home',
      name: 'Home',
      component: Home,

    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: Portfolio
    },

  ]
})


