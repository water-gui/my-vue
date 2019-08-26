import Vue from 'vue'
import 'vant/lib/index.css'
import Vant, { Locale, Swipe, SwipeItem, Grid, GridItem, Toast } from 'vant'

Vue.use(Swipe).use(SwipeItem).use(Toast)
Vue.use(Vant).use(Locale).use(Grid).use(GridItem)

Vue.prototype.$Toast = Toast
