<template>
  <div class="container">
    <div class="cs-curve cs-bg-white mt-4">
      <img alt="logo" src="../assets/MISTER-MONEY.png" />
      <h2><b>UANG KAGET</b></h2>
    </div>
    <div class="mx-1 cs-curve btn-success">
      <h1>Rp. {{$store.state.money.toLocaleString()}}</h1>
    </div>
    <div class="row">
      <ProductCard v-for="product in $store.state.products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  mounted () {
    this.$store.commit('fetchProducts')
    this.$store.commit('getMoney')
  }
}
</script>

<style scoped>
img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
</style>
