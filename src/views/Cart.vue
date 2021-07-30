<template>
  <v-container>
    <h1>Cart</h1>

    <div v-if="cartCount > 0 && $route.query.status === undefined">
      <v-card class="pa-3 mb-5" v-for="item in cart" :key="item.id">
        <v-row>
          <v-col class="d-flex align-center justify-center" cols="2">
            <v-avatar color="white" size="64" tile>
              <v-img contain max-width="64px" :src="item.imgUrl"></v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <p class="ma-0 font-weight-bold">{{ item.nombre }}</p>
            <p class="ma-0 text-subtitle-2">
              <span>Categoría: </span>{{ item.categoria }}
            </p>
            <p class="ma-0">
              <small>{{ item.descripcion }}</small>
            </p>
            <p class="ma-0 text-subtitle-2">Precio: {{ item.precio }}</p>
          </v-col>
          <v-col class="d-flex align-center justify-center">
            <span>
              <v-btn icon @click="disminuirProducto(item)">
                <v-icon>
                  mdi-minus-circle
                </v-icon>
              </v-btn>
              {{ item.quantity }}
              <v-btn icon @click="agregarCarrito(item)">
                <v-icon>
                  mdi-plus-circle
                </v-icon>
              </v-btn>
            </span>
            <v-btn icon color="red" @click="eliminarProducto(item)">
              <v-icon>mdi-cart-remove</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      <div class="text-right mb-2">
        Total: <span class="font-weight-bold">{{ total }}</span>
      </div>
      <div class="text-right mb-2">
        <v-btn
          class="text-none"
          depressed
          color="primary"
          @click="finalizarCompra"
          :loading="loading"
          >Finalizar compra</v-btn
        >
      </div>
    </div>

    <div
      class="justify-center"
      v-if="cartCount === 0 && $route.query.status === undefined"
    >
      <p class="text-center">Tu carrito esta vacio! 😭</p>
      <figure class="d-flex justify-center">
        <v-img contain max-width="40%" src="../assets/empty-cart.png"> </v-img>
      </figure>
    </div>

    <div v-if="$route.query.status !== undefined">
      <p>
        Hemos recibido tu pago 😄!!, su estatus es:
        <span class="font-weight-bold">{{ $route.query.status }}</span>
      </p>
      <p>Gracias por tu compra!</p>
    </div>

    <div class="text-right">
      <router-link to="/">Seguir comprando</router-link>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'Cart',
  mounted() {
    console.log(this.$route);
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapState(['cart', 'cartCount']),
    cartComputed() {
      console.log(this.cart);
      const prueba = Object.assign({}, this.cart);
      return prueba;
    },
    total() {
      let total = 0;
      for (const property in this.cart) {
        let subtotal =
          this.cart[property].quantity * this.cart[property].precio;
        total += subtotal;
      }

      return total;
    },
  },
  methods: {
    ...mapActions(['agregarCarrito', 'disminuirProducto', 'eliminarProducto']),
    async finalizarCompra() {
      this.loading = true;
      if (sessionStorage.user === undefined) {
        this.loading = false;
        this.$router.push({ name: 'Login' });
        return;
      }

      try {
        this.loading = true;
        const dataSend = {};
        dataSend.items = [];
        dataSend.user = {};
        dataSend.user.email = JSON.parse(sessionStorage.user).correo;
        dataSend.user.name = JSON.parse(sessionStorage.user).nombre;
        dataSend.user.surname = JSON.parse(sessionStorage.user).apellidos;

        for (const property in this.cart) {
          const product = {};
          product.title = this.cart[property].nombre;
          product.unit_price = this.cart[property].precio;
          product.quantity = this.cart[property].quantity;

          dataSend.items.push(product);
        }

        const { data } = await axios.post(
          'https://cmas-back.herokuapp.com/',
          dataSend
        );

        window.open(data.linkDePago, '_self');
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
