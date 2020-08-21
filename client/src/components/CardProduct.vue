<template>
  <div class="mx-auto col-12 col-sm-6 col-md-4">
    <b-card tag="article" class="mb-2 ">
      <img :src="product.image_url" alt="" class="card-img-top">
      <b-card-text>
          <br>
          <h4>{{ product.title }}</h4>
          <p class="text-warning">Rp. {{ product.price.toLocaleString() }}</p>
      </b-card-text>
      <div class="input-group">
        <input type="text" disabled="disabled" style="height: 38px" :value="product.stock"/> &nbsp; &nbsp;
        <div v-if="product.price < money && product.stock > 0">
        <b-button href="#" variant="warning" style="min-width:100px;" @click="spendCoins(product.id)">Buy</b-button>
        </div>
        <div v-else>
        <b-button disabled href="#" variant="danger" style="min-width:100px;" @click="spendCoins(product.id)">Buy</b-button>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { Howl } from 'howler'

export default {
  name: 'Product-Card',
  props: ['product', 'money'],
  data () {
    return {
      name: '',
      message: ''
    }
  },
  methods: {
    spendCoins (id) {
      this.$emit('increment', id)
      this.$emit('spendMoney', id)
      const audio = new Howl({
        src: ['coins.mp3'],
        html5: true,
        volume: 0.6,
        format: 'mp3'
      })
      audio.play()
    }
  }
}
</script>

<style scoped>
  .card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
  }
</style>
