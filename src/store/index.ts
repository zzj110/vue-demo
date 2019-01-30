import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import search from './modules/search'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // 严格模式，开发环境下开启，发布环境下关闭
  modules: {
    user,
    search
  }
})

export default store
