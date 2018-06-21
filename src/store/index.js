import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = {
  state: {
    test: 'test'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
}
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
  },
  ...store,
  strict: debug
})
