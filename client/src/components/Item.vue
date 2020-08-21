<template>
  <div>
    <!-- <div>{{item.image}}</div> -->
      <b-card class="item"
        :title= "item.name"
        :img-src= "item.image"
        img-top
      >
      <b-card-body>
        <b-card-text>stock : {{item.stock}}</b-card-text>
        <b-card-text>{{`Rp. ${item.price.toLocaleString()}`}}</b-card-text>
      </b-card-body>
      <b-button pill variant="outline-secondary" @click= "buyItem(item.price)">Buy</b-button>
      </b-card>
  </div>
</template>

<script>
import io from 'socket.io-client'
import swal from 'sweetalert'

export default {
  name: 'Item',
  data () {
    return {
      //   items: this.$store.state.goods
    }
  },
  props: ['item'],
  methods: {
    buyItem (price) {
      if (this.item.stock > 0) {
        if (this.$store.state.balance - price > 0) {
          this.socket = io.connect(this.$store.state.baseUrl)
          this.socket.emit('buyItem', { id: this.item.id, price })
          this.$store.commit('BUY_ITEM', {
            name: this.item.name,
            price: this.item.price
          })
        } else {
          swal('Opppss', 'Your credit is not enough', {
            buttons: false
          })
        }
      } else {
        swal('Sorry', 'Stock Empty', {
          buttons: false
        })
      }
    }
  }
}
</script>

<style>
/* .item {
  height: 400px;
} */
</style>
