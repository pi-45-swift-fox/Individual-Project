<template>
  <div class="w-1/3 p-6">
    <div class="text-gray-700 text-center bg-white shadow-2xl" >
          <div class="font-bold text-xl py-4">{{product.name}}</div>
      <div class="rounded shadow-lg">
        <img class="object-cover h-48 w-full" :src="product.imgUrl" alt="">
        <div class="px-4 py-4">
        </div>
        <div class="max-w-full text-center text-2xl white font-extrabold">
          Price <br>
          Rp. {{product.price.toLocaleString()}}
        </div>
        <div class="flex justify-evenly my-6 pb-10">
          <input type="number"
            class="w-40 text-center bg-gray-200 rounded-full text-md font-semibold text-gray-700"
            :value="product.stock" readonly>
          <button  @click.prevent='buyProduct' :disabled=disableButton() class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const buy = new Audio(require('../sound/ka-ching.mp3'))
const emptyStock = new Audio(require('../sound/stok-habis.mp3'))

export default {
  props: ['product'],
  data () {
    return {
      id: ''
    }
  },
  methods: {
    buyProduct () {
      buy.play()
      this.product.stock--
      this.$store.state.money -= this.product.price
      this.id = this.product.id
      this.$emit('buyProduct', { id: this.id, currentMoney: this.$store.state.money, currentStock: this.product.stock })
      this.id = ''
    },
    disableButton () {
      if (this.product.stock < 1) {
        emptyStock.play()
        return true
      } else if (this.$store.state.money < this.product.price) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
img{
  height: 300px;
}
</style>
