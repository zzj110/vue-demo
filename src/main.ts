import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import store from './store'
// import { getToken } from '@/utils/auth' // getToken from cookie

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
