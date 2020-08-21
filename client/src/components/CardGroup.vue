<template>
  <div class="card-group">
    <div class="card" v-for="product in $store.state.products" :key="product.id">
      <img :src="product.img_url" class="card-img-top" alt />
      <div class="card-body">
        <h5 class="card-title"> {{ product.name }} </h5>
        <h6 class="card-text">Rp. {{ product.price.toLocaleString() }} </h6>
        <h6 class="card-text">Stock: {{ product.stock }} </h6>
        <button class="btn btn-success" @click="buy(product.id)">Beli</button>
        <p class="card-text"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardGroup',
  methods: {
    buy(id) {
      this.$emit('buy', id);
    },
  },
};
</script>

<style>

</style>
