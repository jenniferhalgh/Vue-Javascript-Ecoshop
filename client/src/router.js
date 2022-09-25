import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LogIn from './views/LogIn.vue'
import Customer from './views/Customers.vue'
import Catalogue from './views/Catalogue.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/LogIn',
      name: 'logIn',
      component: LogIn
    }, {
      path: '/customers',
      name: 'customers',
      component: Customer
    }, {
      path: '/catalogue',
      name: 'catalogue',
      component: Catalogue
    }, {
      path: '/Profile',
      name: 'profile',
      component: Profile
    }
  ]
})
