<template>
  <div class="home container">
    <b-jumbotron bg-variant="white" class="mb-1">
      <img alt="Vue logo" src="../assets/bapakarnold.png">
      <br><br>
      <h1 class="font-weight-bold">Spend Mr. Arnold's Money</h1>
    </b-jumbotron>
    <b-navbar sticky="true" variant="warning" class="mt-0 justify-content-center">
      <h3>Rp. {{ $store.state.money.toLocaleString() }} left</h3>
    </b-navbar>
    <b-row class="mt-1 d-flex flex-col">
      <ProductCard v-for="(product, i) in $store.state.products" :key="i" :product="product" @increment="increment" :money="money"></ProductCard>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  mounted () {
    this.$store.commit('fetchProducts')
  }
}
</script>
<style scoped>
</style>
