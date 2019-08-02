import Vue from 'vue'
import App from './App'
import store from './vuex'
import {ajaxGet,ajaxPost} from '@/utils/request';

import MpvueRouterPatch from 'mpvue-router-patch';

Vue.use(MpvueRouterPatch);
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
Vue.prototype.$ajaxGet = ajaxGet;
Vue.prototype.$ajaxPost = ajaxPost;


const app = new Vue({
  store,
  ...App
})
app.$mount()
