<template>
  <div class="home">
    <nav class="navbar navbar-light bg-dark">
      <img
      src="https://i.pinimg.com/236x/dc/4f/53/dc4f53cab3c05abc44182f596fc4b41e--hey-arnold-cartoons.jpg"
      class="navbar-brand this-square">
      <h1 class="text text-white">Spend Arnold's Money</h1>
      <div class="">
        <h5 class="text text-white">Your Money:</h5>
        <h5 class="text text-white">Rp. {{ $store.state.money.toLocaleString() }} </h5>
      </div>
    </nav>
    <div class="row">
      <div class="col">
        <CardGroup @buy="buy" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
import CardGroup from '../components/CardGroup.vue';
import swal from 'sweetalert2';
const buysfx = new Audio(require('../sfx/ef1.wav'));
const failsfx = new Audio(require('../sfx/ef2.wav'));

export default {
  name: 'Home',
  components: {
    CardGroup,
  },
  methods: {
      buy(id) {
        buysfx.play();
        this.socket.emit('buy', id);
    }
  },
  mounted() {
    const Toast = swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
    });

    this.socket = io.connect('https://still-temple-89480.herokuapp.com/');

    this.socket.on('init', (payload) => {
      console.log(payload.msg);
    });
    this.socket.on('game', (game) => {
      this.$store.dispatch('refresh', game);
    });
    this.socket.on('fail', (reason) => {
      failsfx.play();
      if (reason === 'money') {
        Toast.fire({
          icon: 'warning',
          title: 'Insufficient money'
        });
      } else if (reason === 'stock') {
        Toast.fire({
          icon: 'warning',
          title: 'Empty stock'
        });
      } else {
        console.log(reason);
      }
    });
  }
};
</script>

<style>
.this-square {
  width: 80px;
  height: 80px;
};
</style>
