import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: io.connect('http://localhost:3000'),
    money: 0,
    products: []
  },
  mutations: {
    buyProduct (state, price) {
      state.money -= price
    },
    getMoney (state) {
      state.socket.on('money', (payload) => {
        state.money = payload
      })
    },
    fetchProducts (state) {
      state.socket.on('products', (payload) => {
        state.products = payload
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
