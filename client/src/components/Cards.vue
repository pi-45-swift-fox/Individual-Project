<template>
    <div class="card col-4 col-sm-4">
      <div class="tags">
        <p class="tag"><span class="glyphicon glyphicon-tag"></span> {{game.genre}}</p>
      </div>
      <img class="card-img-top" :src="game.imageUrl" alt="Card image cap">
      <div class="bodycard">
          <div class="card-body">
              <h5 class="card-title"><b>{{game.name}}</b></h5>
              <div class="stock">
                  <h6>Stock: {{game.stock}}</h6>
              </div>
              <h5>IDR {{game.price}}</h5>
              <div class="btn-detail">
                  <button
                    @click.prevent='buyGame'
                    :zeroStock=zeroStock()
                    class="btn-click">
                    Buy
                </button>
              </div>
          </div>
      </div>
  </div>


  <!-- <div class="w-1/3 p-6">
    <div class="text-gray-700 text-center bg-white shadow-2xl" >
          <div class="font-bold text-xl py-4">{{game.name}}</div>
      <div class="rounded shadow-lg">
        <img class="object-cover h-48 w-full" :src="game.imagUrl" alt="">
        <div class="px-4 py-4">
        </div>
        <div class="max-w-full text-center text-2xl white font-extrabold">
          Price <br>
          Rp. {{game.price.toLocaleString()}}
        </div>
        <div class="flex justify-evenly my-6 pb-10">
          <input type="number"
            class="w-40 text-center bg-gray-200 rounded-full text-md font-semibold text-gray-700"
            :value="game.stock" readonly>
          <button
            @click.prevent='buyGame'
            :zeroStock=zeroStock()
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Buy
          </button>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'game',
  props: ['game'],
  data() {
    return {
      id: '',
    };
  },
  methods: {
    buyGame() {
      this.game.stock -= 1;
      this.$store.state.money -= this.game.price;
      this.id = this.game.id;
      this.$emit('buyGame', { id: this.id, currentMoney: this.$store.state.money, currentStock: this.$store.state.stock });
      this.id = '';
    },
    zeroStock() {
      if (this.game.stock < 1) {
          console.log(this.game.stock);
        return true;
      } if (this.$store.state.money < this.game.price) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>

.card {
    display: flex;
    flex-flow: row wrap;
    width: 310px;
    margin: 5px;
    height: 300px;
}

.card-img-top {
  width: 100%;
  height: inherit;
}

.bodycard{
  position: absolute;
  display: flex;
  width: 90%;
  height: inherit;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.card-body{
  margin-top: 100px;
  color: aliceblue;
}

.tags {
  display: flex;
  justify-content: flex-end;
  margin-left: -10%;
  width: inherit;
  position: absolute;
  color: rgb(255, 255, 255);
  z-index: 2;
}

.btn-detail {
  margin-bottom: 0;
  /* background-color: red; */
}
.btn-click {
    background-color:royalblue;
}
.btn-click :hover {
    background-color: seagreen;
}
.btn-click ::after{
    background-color: seagreen;
}

#qty {
  border-radius: 5px;
  height: 33px;
  width: 33px;
  margin-right: 5px;
  margin-top: 3px;
  text-align: center;
  color: #000;
}

.deletebtn {
  z-index: 3;
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;
  float: left;
  height: 30px;
  width: 35px;
}

.controlIcon {
  background-color: rgb(255, 255, 255);
  padding: 5px;
  color: blue;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 50px;
  margin-top: 2px;
}

.controlIcon:hover {
  background: rgb(211, 211, 211);
  color: red;
  text-decoration: none;
}

</style>
