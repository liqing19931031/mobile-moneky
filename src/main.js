// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ajax from './ajax'

Vue.config.productionTip = false

const BASEIP = 'http://www.shop.com/'
let $ajax = function (method, url, data) {
  return ajax({
    method: method,
    url: BASEIP + url,
    data: data,
    async: true
  })
}

Vue.prototype.$ajax = $ajax
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
