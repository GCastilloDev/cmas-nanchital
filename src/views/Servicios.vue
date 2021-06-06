<template>
  <v-container>
    <div class="mb-5 d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-avatar class="mr-3" size="40" tile>
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/servicios.png?alt=media&token=2264c36f-b490-4b69-9a76-6ee1b06c3c05"
          ></v-img>
        </v-avatar>
        <h1>Servicios</h1>
      </div>
      <v-btn @click="add" color="primary" depressed>
        <v-icon left>mdi-file-plus</v-icon>
        Crear servicio</v-btn
      >
    </div>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
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
          <v-icon left>mdi-file-edit</v-icon>
          Editar</v-btn
        >
        <v-btn
          class="text-none"
          @click="deleted(item)"
          color="#EC5D57"
          small
          text
        >
          <v-icon left>mdi-file-remove</v-icon>
          Eliminar</v-btn
        >
      </template>
    </v-data-table>

    <component
      :is="component"
      :dialog="dialog"
      :isEdit="isEdit"
      :item="itemSelected"
      @close="close"
      @createdItem="createdItem"
      @updatedItem="updatedItem"
    />
  </v-container>
</template>

<script>
import { db } from "../helpers/Firebase";
import Bus from "../helpers/EventBus";

export default {
  name: "Servicios",
  mounted() {
    this.getData();
  },
  components: {
    ServicioCRU: () => import("../components/servicio/ServicioCRU.vue"),
  },
  data: () => ({
    dialog: false,
    isEdit: false,
    loading: false,
    component: "",
    items: [],
    headers: [
      {
        text: "Nombre",
        value: "nombre",
      },
      {
        text: "Descripción",
        value: "descripcion",
      },
      {
        text: "Precio",
        value: "precio",
      },
      {
        text: "Acciones",
        value: "actions",
      },
    ],
    itemSelected: {
      nombre: "",
      precio: 0,
      descripcion: "",
    },
  }),
  methods: {
    add() {
      this.itemSelected = {
        nombre: "",
        precio: 0,
        descripcion: "",
      };
      this.isEdit = false;
      this.component = "ServicioCRU";
      this.dialog = true;
    },
    edit(item) {
      this.itemSelected = Object.assign({}, item);
      this.isEdit = true;
      this.component = "ServicioCRU";
      this.dialog = true;
    },
    deleted() {},
    close() {
      this.isEdit = false;
      this.dialog = false;
    },
    async getData() {
      try {
        this.loading = true;
        const { docs } = await db.collection("servicios").get();
        const items = [];

        docs.forEach((e) => {
          const item = e.data();
          item.id = e.id;
          items.push(item);
        });

        this.items = items;
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async createdItem() {
      await this.getData();
      this.close();
      Bus.$emit("toast", {
        type: "success",
        message: "Servicio creado con éxito!",
      });
    },
    async updatedItem() {
      await this.getData();
      this.close();
      Bus.$emit("toast", {
        type: "success",
        message: "Servicio actualizado con éxito!",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>