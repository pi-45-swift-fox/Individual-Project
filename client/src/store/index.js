import Vue from 'vue'
import Vuex from 'vuex'
import socket from '../config/socket.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    money: 1000000000000,
    items: [
      {
        name: 'Big Mac',
        price: 15000,
        stock: 56,
        image: 'https://neal.fun/spend/images/big-mac.jpg'
      },
      {
        name: 'Book',
        price: 50000,
        stock: 232,
        image: 'https://neal.fun/spend/images/book.jpg'
      },
      {
        name: 'Video Game',
        price: 4000000,
        stock: 11,
        image: 'https://neal.fun/spend/images/video-game.jpg'
      },
      {
        name: 'Movie Ticket',
        price: 35000,
        stock: 183,
        image: 'https://neal.fun/spend/images/movie-ticket.jpg'
      },
      {
        name: 'Amazon Echo',
        price: 2000000,
        stock: 80,
        image: 'https://neal.fun/spend/images/amazon-echo.jpg'
      },
      {
        name: 'Air Jordans',
        price: 5000000,
        stock: 5,
        image: 'https://neal.fun/spend/images/air-jordans.jpg'
      },
      {
        name: 'Airpods',
        price: 1800000,
        stock: 52,
        image: 'https://neal.fun/spend/images/airpods.jpg'
      },
      {
        name: 'Smartphone',
        price: 11000000,
        stock: 35,
        image: 'https://neal.fun/spend/images/smartphone.jpg'
      },
      {
        name: 'Rolex',
        price: 82000000,
        stock: 22,
        image: 'https://neal.fun/spend/images/rolex.jpg'
      },
      {
        name: 'Tesla',
        price: 2800000000,
        stock: 3,
        image: 'https://neal.fun/spend/images/tesla.jpg'
      },
      {
        name: 'Apache Helicopter',
        price: 8000000000,
        stock: 2,
        image: 'https://neal.fun/spend/images/apache-helicopter.jpg'
      },
      {
        name: 'Ferrari',
        price: 12000000000,
        stock: 4,
        image: 'https://neal.fun/spend/images/ferrari.jpg'
      },
      {
        name: 'Bar of Gold',
        price: 10000000,
        stock: 92,
        image: 'https://neal.fun/spend/images/gold-bar.jpg'
      },
      {
        name: 'Skyscraper',
        price: 700000000000,
        stock: 1,
        image: 'https://neal.fun/spend/images/skyscraper.jpg'
      },
      {
        name: 'Mansion',
        price: 400000000000,
        stock: 1,
        image: 'https://neal.fun/spend/images/mansion.jpg'
      }
    ],
    summary: {}
  },
  getters: {
    setMoney: (state) => (money) => {
      money = money.toString().split('').reverse().join('').match(/(\d{0,3})/g)
      money.pop()
      return money.join('.').split('').reverse().join('')
    },
    getSummary: (state) => {
      return state.summary
    }
  },
  mutations: {
    buyItem (state, index) {
      state.items[index].stock--
      state.money -= state.items[index].price

      if (state.summary[state.items[index].name]) {
        state.summary[state.items[index].name].total++
        state.summary[state.items[index].name].sum += state.items[index].price
      } else {
        state.summary[state.items[index].name] = {}
        state.summary[state.items[index].name].total = 1
        state.summary[state.items[index].name].sum = state.items[index].price
      }

      socket.emit('buy-item', { items: state.items, money: state.money })
    },
    update (state, payload) {
      state.items = payload.items
      state.money = payload.money
    },
    resetBuy (state) {
      state.money += Object.values(state.summary).reduce((a, b) => a + b.sum, 0)

      for (const keys of Object.keys(state.summary)) {
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].name === keys) {
            state.items[i].stock += state.summary[keys].total
          } else {
            continue
          }
        }

        state.summary = {}
        socket.emit('buy-item', { items: state.items, money: state.money })
      }
    },
    addMoney (state) {
      state.money += Math.ceil(Math.random() * 100000000)
      socket.emit('buy-item', { items: state.items, money: state.money })
    }
  },
  actions: {
  },
  modules: {
  }
})
