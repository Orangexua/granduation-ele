import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data;
      console.log(state.userInfo);
    }
  },
  actions: {
    getUserInfo({ commit }, payload) {
      commit("SET_USER_INFO", payload);
    }
  },
  modules: {}
});
