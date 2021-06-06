<template>
  <v-container>
    <div class="mb-5 d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-avatar class="mr-3" size="40" tile>
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/users.png?alt=media&token=5542da0a-6ed6-494b-854d-cc5b36e59c17"
          ></v-img>
        </v-avatar>
        <h1>Usuarios</h1>
      </div>
      <v-btn color="primary" depressed>
        <v-icon left>mdi-account-plus</v-icon>
        Agregar usuario</v-btn
      >
    </div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2 text-none"
          @click="edit(item)"
          color="#298DE0"
          small
          text
        >
          <v-icon left>mdi-account-edit</v-icon>
          Editar</v-btn
        >
        <v-btn
          class="text-none"
          @click="deleted(item)"
          color="#EC5D57"
          small
          text
        >
          <v-icon left>mdi-account-remove</v-icon>
          Eliminar</v-btn
        >
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { db } from "../helpers/Firebase";

export default {
  name: "Usuarios",
  mounted() {
    this.getData();
  },
  data: () => ({
    loading: true,
    items: [],
    headers: [
      {
        text: "Nombre",
        value: "nombre",
      },
      {
        text: "Apellidos",
        value: "apellidos",
      },
      {
        text: "Correo",
        value: "correo",
      },
      {
        text: "Rol",
        value: "rol",
      },
      {
        text: "Acciones",
        value: "actions",
      },
    ],
  }),
  methods: {
    async getData() {
      try {
        const { docs } = await db.collection("usuarios").get();
        this.items = await this.getItems(docs);
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async getItems(docs) {
      const items = [];
      docs.forEach((e) => {
        const item = e.data();
        item.id = e.id;
        items.push(item);
      });
      return items;
    },
    edit({ id }) {
      console.log("EDITAR", id);
    },
    deleted({ id }) {
      console.log("ELIMINAR", id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>