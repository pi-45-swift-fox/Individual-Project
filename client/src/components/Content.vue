<template>
  <div class="content">
    <div class="cards d-flex justify-content-center" id="card">
        <Cards v-for="game in $store.state.games" :key="game.id" :game="game" />
    </div>
  </div>
</template>

<script>
import Cards from './Cards.vue';

export default {
  name: 'Content',
  components: {
    Cards,
  },
};
</script>

<style scoped>

#card {
    margin-top: 0%;
}
.content{
  width: 88%;
  height: 500px;
  margin: auto;
  display: flex;
  overflow: auto;
  background-image: url("https://lh3.googleusercontent.com/proxy/d017igZgLzh66eWT351rkniamVizh7gmswBuLgVQtXoFhgaTPws0xbTXx4zd5iINes5-ZK4nSZ-OaZawPY66V-wodIyxxcU2j_TwFtJZEMk");
  background-size: cover;
}
</style>
