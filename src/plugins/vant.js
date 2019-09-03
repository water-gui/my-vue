import Vue from 'vue'
import 'vant/lib/index.css'
import Vant, { Locale, Swipe, SwipeItem, Grid, GridItem, Toast, Card, Tab, Tabs, Lazyload, Cell, CellGroup, ImagePreview,
  Panel, Stepper, Switch, SubmitBar } from 'vant'

const options = {
  loading: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3412986297,1236395441&fm=26&gp=0.jpg'
}

Vue.use(Swipe).use(SwipeItem).use(Toast)
Vue.use(Vant).use(Locale).use(Grid).use(GridItem).use(Card).use(Tab).use(Tabs).use(Lazyload, options)
  .use(Cell).use(CellGroup).use(Panel).use(Stepper).use(Switch).use(SubmitBar)

Vue.prototype.$Toast = Toast
Vue.prototype.$ImagePreview = ImagePreview
