<template>
  <div class="col mx-4">
    <div class="card" style="width: 18rem;">
      <img :src="product.img_url" class="card-img-top container" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{product.name}}</h5>
        <h5>Rp. {{product.price.toLocaleString()}}</h5>
        <div>
          <h4>stock: {{product.stock}}</h4>
          <button @click.prevent="buyProduct" href="#" type="button" class="btn btn-success" :disabled=disableButton>BUY</button>
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
    buyProduct () {
      const purchasedSound = new Audio(require('../assets/chaching.mp3'))
      const outOfStockSound = new Audio(require('../assets/stock-habis2.mp3'))
      if (this.product.stock > 1) {
        purchasedSound.play()
      } else {
        outOfStockSound.play()
      }
      this.$store.state.socket.emit('new-data', this.product)
      this.product.stock--
      this.$store.commit('buyProduct', this.product.price)
    }
  },
  computed: {
    disableButton () {
      if (this.product.stock < 1 || this.product.price > this.$store.state.money) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  img {
    height: 150px;
    width: auto;
  }
</style>
