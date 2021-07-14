<template>
  <div>
    <v-container v-if="!overlay">
      <h1>Categoría - {{ categoria }}</h1>
      <pre>{{ servicios }}</pre>
    </v-container>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { db } from '../helpers/Firebase';

export default {
  mounted() {
    this.init();
  },
  data: () => ({
    overlay: true,
    servicios: [],
    categoria: '',
  }),
  methods: {
    async init() {
      this.overlay = true;
      await this.getCategoria();
      await this.getServicios();
      this.overlay = false;
    },
    async getCategoria() {
      try {
        const id = this.$route.params.id;
        const doc = await db
          .collection('categorias')
          .doc(id)
          .get();

        this.categoria = doc.data().nombre;
      } catch (error) {
        console.warn(error);
      }
    },
    async getServicios() {
      try {
        const { docs } = await db
          .collection('servicios')
          .where('categoria', '==', this.categoria)
          .get();
        this.servicios = docs.map((e) => e.data());
        console.log(this.servicios);
      } catch (error) {
        console.warn(error);
      }
    },
  },
  watch: {
    $route: function() {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped></style>
