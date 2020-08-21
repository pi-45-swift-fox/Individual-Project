<template>
  <div class="container">
    <div id="cont-image" class="container">
      <img src="https://pm1.narvii.com/6568/b25cb37434bbaecc3aeb517dca47b31fab9e8c84_128.jpg" alt="">
      <h1>Spend Nanon's Money</h1>
    </div>
    <div class="container" id="money">
      <div class="container">IDR {{ $store.state.money.toLocaleString() }}</div>

    </div>
    <div class="container" id="cont-card-product">
      <div class="row">
        <ProductCard v-for="(product, i) in $store.state.products" :key="i" :product="product"> </ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/productCard.vue'

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
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.card-container {
    display: grid;
    gap: 10px;
}

img {
  width: auto;
  height: 150px;
  border-radius: 50%;
}

#money {
  background-color:#D2E9DA;
  width:auto;
  height:130px;
  font-size: 40px;
  text-align: center;
  padding: 25px;
  font-family: 'Montserrat', sans-serif;
}

#cont-image {
  background-color: white;
  padding: 20px;
  margin-bottom: 10px;
}

#cont-card-product {
  background-color: white;
  margin-top: 10px;
  padding: 20px;
}

h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  text-transform: uppercase;
}

* {
  border-radius: 25px;
}

</style>
