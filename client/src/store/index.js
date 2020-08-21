import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io.connect('http://localhost:3000/'),
    products: [],
    money: 0
  },
  mutations: {
    fetchProducts (state, id) {
      state.socket.on('init', (payload) => {
        state.products = payload.products
        state.money = payload.money
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
