import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'
import Cart from './views/Cart/index.vue'
import Friends from './views/Friends/index.vue'
import Search from './views/Search/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/friends',
      component: Friends
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
