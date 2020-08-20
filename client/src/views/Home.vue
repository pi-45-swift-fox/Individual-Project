<template>
  <div class="container mx-auto">
    <div class="container">
      <Profile/>
      <Money/>
      <!-- <img src="https://images.wallpaperscraft.com/image/money_dollar_dignity_amount_denominations_one_background_31463_1280x720.jpg" alt=""> -->
    </div>
    <div class="flex justify-around flex-wrap bg-gray-100">
    <Cards @buyProduct="buyProduct" v-for="product in $store.state.products" :key="product.id" :product="product"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '../components/Profile'
import Money from '../components/Money'
import Cards from '../components/Cards'
import io from 'socket.io-client'

export default {
  name: 'Home',
  methods: {
    buyProduct ({ id, currentMoney, currentStock }) {
      this.socket.emit('update', ({ newMoney: this.$store.state.money, id }))
    }
  },
  components: {
    Profile,
    Money,
    Cards
  },
  mounted () {
    this.socket = io.connect('http://localhost:3000')
    this.socket.on('fetchData', ({ data, money }) => {
      this.$store.state.products = data
      this.$store.state.money = money
    })
  }
}
</script>

<style scoped>

</style>
