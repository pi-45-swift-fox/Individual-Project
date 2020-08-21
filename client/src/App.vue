<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script type="text/javascript">
import socket from './config/socket.js'

export default {
  created () {
    socket.emit('test', { money: this.$store.state.money, items: this.$store.state.items })

    socket.on('get-data', payload => {
      console.log(payload, '<<<<< io . emit')
      this.$store.commit('update', payload)
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F1F2F6;
}
</style>
