import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    balance: 1000000000000,
    receipts: [],
    available_products: [],
    socket: io.connect('http://localhost:3000')

  },
  mutations: {
    buyProduct (state, productPrice) {
      state.balance = state.balance - productPrice
    },
    updateReceipt (state, info) {
      console.log('masuk')
      const index = state.receipts.findIndex(x => x.id === info.id)
      console.log('index dri store', index)
      if (index !== -1) {
        console.log('masuk if>>>')
        state.receipts[index].count++
      } else {
        console.log('masuk else')
        state.receipts.push({
          id: info.id,
          name: info.name,
          count: 1,
          price: info.price
        })
      }
      // if (state.receipts.length > 0) {
      //   state.receipts.forEach(receipt => {
      //     if (receipt.id === info.id) {
      //       status = true
      //       state.receipts[receipt.id].count++
      //       // return receipt.count++
      //     }
      //   })
      // }
      // if (status === false) {
      //   state.receipts.push({
      //     id: info.id,
      //     name: info.name,
      //     count: 1,
      //     price: info.price
      //   })
      // }
    },
    setProducts (state, products) {
      state.available_products = products
    },
    updateStock (state, payload) {
      // console.log(state.available_products, id, '>>>>>>>')
      const index = state.available_products.findIndex(x => x.id === payload.id)
      state.available_products[index].stock--
    }
  },
  actions: {
    getProducts (context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then(response => {
          // console.log(response.data)
          context.commit('setProducts', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
