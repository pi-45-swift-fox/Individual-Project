<template>
  <b-card
    :title="product.name"
    :img-src="product.image_url"
    img-width="300"
    img-height="200"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      <input type="text" disabled="disabled" class="card__input" :value="product.stock">
      <button @click="buy" :disabled="product.stock == 0 || product.price > $store.state.balance">Beli</button>
    </b-card-text>

  </b-card>
</template>

<script>
// import io from 'socket.io-client'
export default {
  data () {
    return {
      stock: 0,
      name: '',
      price: 0,
      id: 0
    }
  },
  name: 'Card',
  props: ['product'],
  methods: {
    buy () {
      this.$store.commit('buyProduct', this.product.price)
      this.$store.commit('updateReceipt', { id: this.product.id, name: this.product.name, price: this.product.price })
      this.$store.commit('updateStock', { id: this.product.id })
      this.$store.state.socket.emit('clientPurchase', { id: this.product.id, name: this.product.name, price: this.product.price })
    },
    setInformation () {
      this.stock = this.product.stock
      this.name = this.product.name
      this.price = this.product.price
      this.id = this.product.id
    }
  },
  created () {
    this.setInformation()
  },
  mounted () {
    // this.socket = io.connect('http://localhost:3000')
    // this.socket.on('coba', payload => {
    //   console.log(payload)
    //   this.$store.commit('buyProduct', payload.price)
    //   this.$store.commit('updateReceipt', { id: payload.id, name: payload.name, price: payload.price })
    // })
  }
}
</script>

<style>

</style>
