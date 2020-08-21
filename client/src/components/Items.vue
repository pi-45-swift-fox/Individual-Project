<template lang="html">
  <div class="">
    <div class="items grid">
      <div class="grid-item" v-for="(item, i) in $store.state.items" :key="i">
        <div class="image">
          <img :src="item.image" alt="">
        </div>
        <h5 class="font-weight-bold">{{ item.name }}</h5>
        <h5>Rp. {{ $store.getters.setMoney(item.price) }}</h5>
        <div class="button-group">
          <b-button class="stock" disabled type="reset" variant="outline-secondary">{{ item.stock }}</b-button>
          <b-button @click="buyItem(i)" v-if="$store.state.money >= $store.state.items[i].price && $store.state.items[i].stock > 0" class="button font-weight-bold" type="submit" variant="success">Buy</b-button>
          <b-button disabled @click="buyItem(i)" v-else class="button font-weight-bold" type="submit" variant="success">Buy</b-button>
        </div>
      </div>
    </div>
    <div class="summary" v-if="Object.keys($store.getters.getSummary).length > 0">
      <h2 class="font-weight-bold">Your Receipt</h2><br>
      <div class="total" v-for="(item, key, index) in $store.state.summary" :key="index">
        <h4 class="font-weight-bold">{{key}}</h4>
        <h4 class="font-weight-bold">x{{item.total}}</h4>
        <h4 class="font-weight-bold" style="color: #2ECC71;">Rp. {{$store.getters.setMoney(item.sum)}}</h4>
      </div>
      <div class="line"></div>
      <div class="total" style="margin-bottom: 10px;">
        <h4 class="font-weight-bold" style="margin-top: 10px;">Total</h4>
        <h4 class="font-weight-bold" style="margin-top: 10px; color: #2ECC71">Rp. {{ $store.getters.setMoney(Object.values($store.getters.getSummary).reduce((a,b) => a + b.sum, 0)) }}</h4>
      </div>
      <b-button @click="$store.commit('resetBuy')" class="button font-weight-bold" type="submit" variant="success">Clear summary</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Items',
  methods: {
    buyItem (i) {
      this.$store.commit('buyItem', i)
    },
    setMoney (money) {
      money = money.toString().split('').reverse().join('').match(/(\d{0,3})/g)
      money.pop()
      return money.join('.').split('').reverse().join('')
    }
  }
}
</script>

<style lang="css" scoped>
.items {
  margin-top: 10px;
}

.summary {
  margin-top: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-direction: column;
}

.total {
  width: 50%;
  display: flex;
  justify-content: space-between;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.grid-item {
  margin-bottom: 10px;
  background-color: #ffffff;
  min-width: 32.7%;
  height: 350px;
  padding: 15px;
}

.image {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 15px;
}

img {
  max-width: 500px;
  height: auto;
}

.button-group {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
}

.button {
  width: 12rem;
  max-width: 100%;
}

.stock {
  background-color: #e0e0e0;
  width: 7rem;
  margin-right: 10px;
}

.line {
  width: 50%;
  height: 1px;
  background-color: #030303;
}

@media (max-width: 1200px) {
  .grid-item {
    min-width: 49.5%;
  }
}

@media (max-width: 991px) {
  .grid-item {
    min-width: 100%;
  }
}
</style>
