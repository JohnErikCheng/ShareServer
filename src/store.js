import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = new Vuex.Store({
  state: {
    auth: false,
    menus: false
  },
  mutations: {
    authed:function(state) {
      state.auth = true;
    },
    menusLoaded: function (state) {
      state.menus = true;
    }
  }
});

export default state;
