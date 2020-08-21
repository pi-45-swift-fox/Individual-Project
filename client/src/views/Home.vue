<template>
  <div class="home">
    <b-container fluid="sm" class="container">
      <Header />
      <Money />
      <Items />
    </b-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Money from '@/components/Money.vue'
import Items from '@/components/Items.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Money,
    Items
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.container {
}
</style>
