import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import dataBase from '@/components/DataBase'
import login from '@/components/user/Login'
import signup from '@/components/user/Signup'
import webservice from '@/components/webservice'
import translateRecord from '@/components/webservice/translateRecord'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/dataBase',
      name: 'DataBase',
      component: dataBase
    },
    {
      path:'/login',
      name: 'Login',
      component: login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: signup
    },
    {
      path: '/webservice',
      name: 'webservice',
      component: webservice
    },
    {
      path: '/webservice/translateRecord',
      name: 'translateRecord',
      component: translateRecord
    }
  ]
})
