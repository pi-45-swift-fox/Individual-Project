<template lang="html">
  <div class="header">
    <img src="../../public/image/billgates_square.jpg" alt="" />
    <h2 class="font-weight-bold">Spend Bill Gates Money</h2>
    <a @click.prevent="$store.commit('addMoney')" v-if="$store.state.money < 1000000000000" href="" class="font-weight-bold" style="color: #2ECC71; margin-bottom: 10px;">Use babi ngepet power...</a>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  background-color: #ffffff;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
}

img {
  max-width: 150px;
  border-radius: 100%;
  margin: 30px 0 30px 0;
}
</style>
