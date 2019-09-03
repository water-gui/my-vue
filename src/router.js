import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'
import Cart from './views/Cart/index.vue'
import Friends from './views/Friends/index.vue'
import Search from './views/Search/index.vue'
import Newslist from './views/Home/news/newslist/index.vue'
import Newsinfo from './views/Home/news/newsinfo/index.vue'
import Photolist from './views/Home/photos/index.vue'
import PhotoInfo from './views/Home/photos/photoinfo/index.vue'
import GoodsList from './views/Home/goods/goodslist/index.vue'
import GoodsInfo from './views/Home/goods/goodsinfo/index.vue'

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
    },
    {
      path: '/home/newslist',
      component: Newslist
    },
    {
      path: '/home/newsinfo/:id',
      component: Newsinfo
    },
    {
      path: '/home/photolist',
      component: Photolist
    },
    {
      path: '/home/photos/:id',
      component: PhotoInfo
    },
    {
      path: '/home/goodslist',
      component: GoodsList
    },
    {
      path: '/home/goodsinfo/:id',
      component: GoodsInfo
    }
  ]
})
