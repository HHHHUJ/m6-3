import Vue from 'vue'
import App from './App'
import store from './vuex'

// const wx = 'mpvue'
wx.cloud.init({
  env: 'hujie-b7d5f7',
  traceUser: true
})
const db = mpvue.cloud.database('hujie-b7d5f7');
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store;
Vue.prototype.$db = db;

const app = new Vue({
  store,
  ...App
})
app.$mount()
