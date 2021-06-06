<template>
  <v-container>
    <h1 class="mb-7">Panel de administrador</h1>
    <h3 class="font-weight-light">Bienvenido {{ user.nombre }}!</h3>
    <p>Favor de seleccionar alguna de las siguientes opciones:</p>

    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="item in menu" :key="item.nombre">
        <v-card
          :color="item.color"
          dark
          link
          :to="{ name: item.to }"
          height="100%"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="text-h5" v-text="item.title"></v-card-title>

              <v-card-subtitle v-text="item.description"></v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="100" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Admin",
  data: () => ({
    menu: [
      {
        title: "Usuarios",
        to: "Usuarios",
        color: "#39c2d7",
        description: "Módulo para la visualización y gestión de los usuarios.",
        src: "https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/users.png?alt=media&token=5542da0a-6ed6-494b-854d-cc5b36e59c17",
      },
      {
        title: "Roles",
        to: "Roles",
        color: "#b22746",
        description: "Módulo para la visualización y gestión de los roles.",
        src: "https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/roles.png?alt=media&token=edbf2984-5e75-4e4b-aa1a-b44d8e65f55f",
      },
      {
        title: "Servicios",
        to: "Servicios",
        color: "#a3c644",
        description: "Módulo para la visualización y gestión de los servicios.",
        src: "https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/servicios.png?alt=media&token=2264c36f-b490-4b69-9a76-6ee1b06c3c05",
      },
      {
        title: "Categorías",
        to: "Categorias",
        color: "#8e244d",
        description:
          "Módulo para la visualización y gestión de las categorías.",
        src: "https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/categorias.png?alt=media&token=69531055-62bd-4223-b36d-9c73851f1573",
      },
    ],
  }),
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style lang="scss" scoped>
</style>