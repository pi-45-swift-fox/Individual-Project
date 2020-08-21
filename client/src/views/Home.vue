<template>
  <div class="home">
    <div class="harga">
      <h1>{{`Rp. ${$store.state.balance.toLocaleString()}`}}</h1><br>
    </div>
    <div class="container">
    <b-card-group columns>
      <Item v-for="item in $store.state.items" :key="item.id" :item="item" />
    </b-card-group>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Item from '@/components/Item'

export default {
  name: 'Home',
  components: {
    Item
  },
  created () {
    this.$store.dispatch('fetchData')
  }
}
</script>

<style>

.harga {
  color: goldenrod;
  position: sticky;
}

</style>
