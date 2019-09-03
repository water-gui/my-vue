import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import store from './store'
import './plugins/vant.js'
import 'lib-flexible'

axios.defaults.baseURL = 'http://localhost:5000/'
// axios.defaults.baseURL = 'http://10.41.151.50:5000'
// 全局配置axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('datefmt', (str, arg2 = "'YYYY-MM-DD HH:mm:ss'") => {
  return moment(str).format(arg2)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
