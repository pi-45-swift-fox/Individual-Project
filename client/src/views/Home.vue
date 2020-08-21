<template>
  <div class="home container">
    <b-jumbotron bg-variant="white" class="mb-1">
      <img alt="Vue logo" src="../assets/shop.png">
      <br><br>
      <h1 class="font-weight-bold">Spend Arnold's Money</h1>
    </b-jumbotron>
    <b-navbar sticky="true" variant="warning" class="mt-0 justify-content-center">
      <h3>Rp. {{ money.toLocaleString() }} left</h3>
    </b-navbar>
    <b-row class="mt-1 d-flex flex-col">
      <ProductCard v-for="(product, i) in products" :key="i" :product="product" @increment="increment" @spendMoney="spendMoney" :money="money"></ProductCard>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client'
import ProductCard from '../components/CardProduct'

export default {
  name: 'Home',
  data () {
    return {
      products: [],
      money: 0
    }
  },
  components: {
    ProductCard
  },
  methods: {
    increment (id) {
      console.log(id)
      this.socket.emit('new-message', { id: id })
    },
    spendMoney (id) {
      this.socket.emit('new-money', { id: id })
    }
  },
  mounted () {
    this.socket = io.connect('http://localhost:3000/')

    // event listener
    this.socket.on('init', (payload) => {
      this.products = payload
    })

    this.socket.on('new-message', (payload) => {
      this.products = payload
    })

    this.socket.on('init-money', payload => {
      this.money = payload
    })

    this.socket.on('new-money', payload => {
      this.money = payload
    })
  }
}
</script>
<style scoped>
</style>
