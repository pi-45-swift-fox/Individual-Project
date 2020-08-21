<template>
  <div>
    <div class="col mx-4">
      <div class="card" style="width: 18rem;">
        <img :src="product.image_url" class="card-img-top container" :alt="product.name">
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text"> IDR {{ product.price.toLocaleString() }} </p>
          <div class="container">
            <input type="text" disabled="disabled" class="card__input" :value="product.stock" style="width:80px; text-align: center; height:37px;">
            <button :disabled=disableButton class="btn btn-success btn" style="width: 100px;" @click.prevent="buyProduct(product.id, product.price)">Buy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    buyProduct(id, price) {
      const audio = new Audio(require('../assets/click1.mp3'));
      const outStock = new Audio(require('../assets/click2.mp3'));

      if (this.product.stock < 2 || this.$store.state.money < this.product.price) {
        outStock.play();
      } else {
        audio.play();
      }

      this.product.stock--;
      this.$store.state.socket.emit('newUpdate', { id, price });
      this.$store.commit('grabbedStock', { id, price });
    },
  },
  computed: {
    disableButton() {
      if (this.product.stock < 1 || this.$store.state.money < this.product.price) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
img {
  max-height: 100px;
  min-height: 100px;
  width: auto;
}

</style>
