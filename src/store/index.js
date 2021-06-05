import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    rol: null,
    session: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setRol(state, payload) {
      state.rol = payload;
    },
    setSession(state, payload) {
      state.session = payload;
    },
  },
  actions: {
    sessionInit({ commit }, payload) {
      commit("setSession", true);

      commit("setRol", payload.rol);
      delete payload.rol;

      commit("setUser", payload);
    },
    cerrarSession({ commit }) {
      commit("setSession", false);
      sessionStorage.clear();
      commit("setRol", null);
      commit("setUser", null);
    },
  },
  modules: {},
});
