<template lang="html">
  <div class="money">
    <h2 class="font-weight-bold">Rp. {{ $store.getters.setMoney($store.state.money) }} left</h2>
  </div>
</template>

<script>
export default {
  name: 'Money'

}
</script>

<style lang="css" scoped>
.money {
  margin-top: 10px;
  background-color: #2ECC71;
  color: #ffffff;
  padding: 20px;
}

h2 {
  margin-top: 10px;
}
</style>
