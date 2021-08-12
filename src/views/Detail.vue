<template>
  <v-container>
    <h1 class="mb-15">Detalle de servicio</h1>
    <v-row class="contenedor d-flex align-center justify-center">
      <v-col cols="3" v-if="product !== null">
        <figure>
          <v-img :src="product.imgUrl"></v-img>
        </figure>
      </v-col>
      <v-col cols="5" v-if="product !== null">
        <h2>{{ product.nombre }}</h2>
        <h3>Categoria: {{ product.categoria }}</h3>
        <h4>Descripción:</h4>
        <p>{{ product.descripcion }}</p>
        <h4>Precio: ${{ product.precio }}</h4>
        <v-btn class="mb-3 text-none" color="primary" @click="addToCart"
          >Agregar al carrito</v-btn
        >
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="primary">
      Producto
      <span class="font-weight-bold">{{ snackbarMessage }}</span> agregado a su
      carrito con exito!
    </v-snackbar>
  </v-container>
</template>

<script>
  import { db } from '../helpers/Firebase';
  import { mapActions } from 'vuex';

  export default {
    name: 'Detail',
    mounted() {
      const id = this.$route.params.id;
      this.get(id);
    },
    data: () => ({
      product: null,
      snackbar: false,
      snackbarMessage: '',
    }),
    methods: {
      ...mapActions(['agregarCarrito']),

      addToCart() {
        this.agregarCarrito(this.product);
        this.snackbarMessage = this.product.nombre;
        this.snackbar = true;
        this.$router.push({ name: 'Cart' });
      },
      async get(id) {
        try {
          const data = await db
            .collection('servicios')
            .doc(id)
            .get();
          this.product = data.data();
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .contenedor {
    min-height: 70vh;
  }
</style>
