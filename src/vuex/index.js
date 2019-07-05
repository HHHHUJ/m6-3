/*
 *
 *
 * @Author: hujie
 * @Date: 2019-07-05 10:45:05
 * @Last Modified by: hujie
 * @Last Modified time: 2019-07-05 10:45:56
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store