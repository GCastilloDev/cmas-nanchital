<template>
  <v-container>
    <h1>Cart</h1>

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
      <v-btn class="text-none" depressed color="primary"
        >Finalizar compra</v-btn
      >
    </div>
    <div class="text-right">
      <router-link to="/">Seguir comprando</router-link>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
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
  },
};
</script>

<style lang="scss" scoped></style>
