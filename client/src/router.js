import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import signIn from './views/signIn.vue'
import signUp from './views/signUp.vue'
import Admin from './views/Admin.vue'
import Catalogue from './views/Catalogue.vue'
import ShoppingCart from './views/shoppingCart.vue'
import PaymentMethod from './views/choosePayment.vue'
import OrderSummary from './views/orderSummary.vue'
import personalInfo from './views/personalInfo.vue'
import orders from './views/orders.vue'
import paymentInfos from './views/paymentMethods.vue'
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
      path: '/signIn',
      name: 'signIn',
      component: signIn
    }, {
      path: '/signUp',
      name: 'signUp',
      component: signUp
    }, {
      path: '/admin',
      name: 'admin',
      component: Admin
    }, {
      path: '/catalogue',
      name: 'catalogue',
      component: Catalogue
    }, {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    }, {
      path: '/Profile',
      name: 'personalInfo',
      component: personalInfo
    },
    {
      path: '/checkout/paymentMethod',
      name: 'paymentMethod',
      component: PaymentMethod
    },
    {
      path: '/checkout/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },
    {
      path: '/checkout/order',
      name: 'order',
      component: OrderSummary
    },
    {
      path: '/profile/personalInformation',
      name: 'personalInfo',
      component: personalInfo
    },
    {
      path: '/profile/paymentInfos',
      name: 'paymentInfos',
      component: paymentInfos
    },
    {
      path: '/profile/orders',
      name: 'orders',
      component: orders
    }
  ]
})
