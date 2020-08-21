import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    balance: 0,
    items: [],
    buyItems: []
  },
  mutations: {
    SET_ITEMS (state, newItems) {
      state.items = newItems
    },
    SET_BALANCE (state, newBalance) {
      state.balance = newBalance
    },
    BUY_ITEM (state, buyItem) {
      if (state.buyItems.length === 0) {
        console.log('item masih kosong')
        state.buyItems.push({
          name: buyItem.name,
          much: 1,
          subtotal: buyItem.price
        })
      } else {
        let flag = false
        console.log('cek item')
        state.buyItems.forEach(e => {
          if (e.name === buyItem.name) {
            console.log('wahh item ada')
            e.much++
            e.subtotal += buyItem.price
            flag = true
          }
        })
        if (!flag) {
          console.log('buat item baru')
          state.buyItems.push({
            name: buyItem.name,
            much: 1,
            subtotal: buyItem.price
          })
        }
      }
    }
  },
  actions: {
    fetchData ({ commit }) {
      this.socket = io.connect(this.state.baseUrl)
      this.socket.on('fetchData', data => {
        commit('SET_ITEMS', data.item)
        commit('SET_BALANCE', data.balance)
      })
    }
  },
  modules: {
  }
})
