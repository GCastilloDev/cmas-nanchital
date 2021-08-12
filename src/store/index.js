import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    rol: null,
    session: false,
    cart: {},
    cartCount: 0,
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
    setProducto(state, payload) {
      if (state.cart[payload.id] === undefined) {
        state.cart[payload.id] = payload;
        state.cart[payload.id].quantity = 1;
        state.cartCount++;
        return;
      }

      if (state.cart[payload.id] !== undefined) {
        state.cart[payload.id].quantity++;
        state.cart = Object.assign({}, state.cart);
        state.cartCount++;
        return;
      }
    },
    unsetProduct(state, payload) {
      if (state.cart[payload.id].quantity <= 1) return;
      state.cart[payload.id].quantity--;
      state.cart = Object.assign({}, state.cart);
      state.cartCount--;
    },
    deleteProduct(state, payload) {
      const quantity = state.cart[payload.id].quantity;
      state.cartCount -= quantity;
      delete state.cart[payload.id];
      state.cart = Object.assign({}, state.cart);
    },
    unsetCart(state) {
      state.cart = {};
      state.cartCount = 0;
    },
  },
  actions: {
    sessionInit({ commit }, payload) {
      commit('setSession', true);

      commit('setRol', payload.rol);
      delete payload.rol;

      commit('setUser', payload);
    },
    cerrarSession({ commit }) {
      commit('setSession', false);
      sessionStorage.clear();
      commit('setRol', null);
      commit('setUser', null);
    },
    agregarCarrito({ commit }, producto) {
      commit('setProducto', producto);
    },
    disminuirProducto({ commit }, producto) {
      commit('unsetProduct', producto);
    },
    eliminarProducto({ commit }, producto) {
      commit('deleteProduct', producto);
    },
    vaciarCarrito({ commit }) {
      commit('unsetCart');
    },
  },
  modules: {},
});
