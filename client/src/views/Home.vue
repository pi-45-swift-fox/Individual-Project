<template>
  <div class="container">
    <div id="cont-image" class="container">
      <img src="../../public//image//baril.jpeg" alt="">
      <h1>Spend Baril Money</h1>
    </div>
    <div class="container" id="money">
      <div class="container">IDR {{ $store.state.money.toLocaleString() }}</div>

    </div>
    <div class="container" id="card-p">
      <div class="row">
        <ProductCard v-for="(product, i) in $store.state.products"
        :key="i" :product="product"> </ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/productCard';

export default {
  name: 'Home',
  components: {
    ProductCard,
  },
  mounted() {
    this.$store.commit('fetchProducts');
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

.card-container {
    display: grid;
}

img {
  width: auto;
  height: 150px;
  border-radius: 50%;
}

#money {
  background-color:#31d069;
  width:auto;
  height:120px;
  font-size: 50px;
  text-align: center;
  padding: 25px;
}

#cont-image {
  background-color: fce1e0;
  padding: 20px;
  margin-bottom: 10px;
}

#card-p {
  background-color: white;
  margin-top: 10px;
  padding: 20px;
}

h1 {
  font-weight: 300;
  text-transform: uppercase;
}

* {
  border-radius: 25px;
}

</style>
