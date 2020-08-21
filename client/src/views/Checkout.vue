<template>
  <div class="container checkout">
    <div class="buyItem">
      <h1>Purchase History</h1>
      <b-table class="buyItem" striped :items="items"></b-table><br>
      <h3 class="buyItem">Total Purchase = Rp. {{total.toLocaleString()}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newItems: [],
      total: 0,
      items: this.$store.state.buyItems
    }
  },
  created () {
    this.items.forEach(e => {
      this.total += e.subtotal
    })
  }
}
</script>
<style scooped>

.buyItem {
  color: goldenrod;
}

.checkout {
  height: 100vh;
  width: 100vh;
}

</style>
