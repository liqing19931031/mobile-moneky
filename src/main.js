// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ajax from './ajax'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import { InputNumber } from 'element-ui'

Vue.config.productionTip = false

const BASEIP = 'http://www.shop.com/ApiUrl'
// const BASEIP = 'http://www.mhw001.com/'
let $ajax = function (method, url, data, specail) {
  return ajax({
    method: method,
    url: specail ? BASEIP : '/' + url,
    data: data,
    async: true
  })
}

let getQuerry = function (url, variable) {
   let vars = url.split('&')
   let myid
   for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      myid = pair[0] === variable ? pair[1] : ''
   }
   return myid
}

let getCookie = function (name) {
  let cookieName = encodeURIComponent(name) + '='
  let cookieStart = document.cookie.indexOf(cookieName)
  let cookieValue = ''
  if (cookieStart > -1) {
    let cookieEnd = document.cookie.indexOf(';', cookieStart)
    if (cookieEnd === -1) {
        cookieEnd = document.cookie.length
    }
    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
  }
  return cookieValue
}

Vue.use(MuseUI)
Vue.use(InputNumber)
Vue.prototype.$ajax = $ajax
// Vue.prototype.BASEURL = 'http://www.shop_wap.com/tmpl/'
Vue.prototype.BASEURL = 'http://wap.mhw001.com/tmpl/'
let setUrl = function () {
  return ['http://ucenter.mhw001.com?ctl=Login&met=index&typ=e&from=wap&callback=', encodeURIComponent([BASEIP, '?ctl=Login&met=check&typ=e&redirect=', encodeURIComponent(window.location.href)].join(''))].join('')
}
Vue.prototype.setUrl = setUrl
Vue.prototype.getCookie = getCookie
Vue.prototype.getQuerry = getQuerry

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
