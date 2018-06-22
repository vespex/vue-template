// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import infiniteScroll from 'vue-infinite-scroll'
import base from './utils/base' // rem及环境判断 适用移动端
import './assets/css/style.scss'

Vue.use(base)
Vue.use(infiniteScroll) // 需要无限滚动加载时使用

FastClick.attach(document.body) // 添加fastclick 适用移动端

Vue.config.productionTip = false

const mixin = {
  computed: {
  },
  methods: {
  }
}

Vue.mixin(mixin) // 注入mixin

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
