<template>
  <div id="bg">
    <div id="user">
      <Buyer />
      <Money />
    </div>
    <div class="home">
      <div class="content">
      <Content @buyGame=buyGame() />
    </div>
  </div>

  </div>
</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
import Buyer from '../components/Buyer.vue';
import Content from '../components/Content.vue';
import Money from '../components/Money.vue';

export default {
  name: 'Home',
  components: {
    Buyer,
    Money,
    Content,
  },
  methods: {
    buyGame({ id, currentMoney, currentStock }) {
      this.socket.emit('update', { newMoney: this.$store.state.money, id });
    },
  },
  mounted() {
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('fetchData', ({ data, money }) => {
      this.$store.state.games = data;
      this.$store.state.money = money;
    });
  },
};
</script>

<style scoped>


</style>