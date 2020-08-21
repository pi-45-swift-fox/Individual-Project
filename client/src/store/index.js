import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    money: 0,
    products: []
  },
  mutations: {
    set_game(state, game) {
      state.products = game.products;
      state.money = game.money;
    }
  },
  actions: {
    refresh({ commit }, game) {
      commit('set_game', game);
    }
  },
  modules: {
  },
});
