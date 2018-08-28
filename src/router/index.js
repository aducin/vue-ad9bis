import Vue from 'vue'
import Router from 'vue-router'

import Account from '@/account/Account'
import Customer from '@/customer/Customer'
import Login from '@/login/Login'
import Order from '@/order/Order'
import Postal from '@/postal/Postal'
import Product from '@/product/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          path: ':db/:id',
          name: 'orderDetails',
          component: Order
        },
        {
          path: ':db/:id/discount',
          name: 'orderDiscount',
          component: Order
        },
        {
          path: ':db/:id/even',
          name: 'orderEven',
          component: Order
        }
      ]
    },
    {
      path: '/postal',
      name: 'postal',
      component: Postal
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
