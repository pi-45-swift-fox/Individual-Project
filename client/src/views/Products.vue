<template>
  <div>
      <h1>Products</h1>
      <h3>Saldo</h3><br>
      <h5>{{$store.state.balance}}</h5>
      <b-card-group deck>
        <Card v-for="(product,i) in $store.state.available_products" :key="i" :product="product" :cardId="product.id"></Card>
      </b-card-group>
      <div>
        <table>
          <thead>
            <td>.     .</td>
            <td>.     .</td>
            <td>.     .</td>
          </thead>
          <tr v-for="(data,i) in $store.state.receipts" :key="i">
            <td>{{data.name}}</td>
            <td>{{data.count}}</td>
            <td>{{data.count*data.price}}</td>
          </tr>
        </table>
      </div>
  </div>
</template>

<script>
// import axios from 'axios'
import Card from '../components/Card.vue'
// import io from 'socket.io-client'
export default {
  name: 'Products',
  components: {

    Card

  },
  methods: {
    // getProducts () {
    //   axios({
    //     method: 'GET',
    //     url: 'http://localhost:3000/products'
    //   })
    //     .then(data => {
    //       console.log(data)
    //       this.available_products = data.data
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.state.socket.on('coba1', payload => {
      this.$store.commit('buyProduct', payload.price)
      this.$store.commit('updateStock', { id: payload.id })
      this.$store.commit('updateReceipt', { id: payload.id, name: payload.name, price: payload.price })
      // console.log(payload)
      // console.log(this.stock)
    })
  }
  // mounted () {
  //   this.socket = io.connect('http://localhost:3000')
  //   this.socket.on('coba', payload => {
  //     console.log(payload)
  //     this.$store.commit('buyProduct', payload.price)
  //     this.$store.commit('updateReceipt', { id: payload.id, name: payload.name, price: payload.price })
  //   })
  // }
}
</script>

<style>

</style>
