import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    socket: io.connect('http://localhost:3000'),
    money: 0
  },
  mutations: {
    fetchProducts (state) {
      state.socket.on('products', (payload) => {
        state.products = payload.products
        state.money = payload.money
        console.log('init invoked')
      })
    },
    grabbedStock (state, objDetail) {
      console.log(state.money)
      state.money -= objDetail.price
    }
  },
  actions: {
  },
  modules: {
  }
})
