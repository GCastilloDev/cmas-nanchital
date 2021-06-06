<template>
  <v-container>
    <div class="mb-5 d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-avatar class="mr-3" size="40" tile>
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/categorias.png?alt=media&token=69531055-62bd-4223-b36d-9c73851f1573"
          ></v-img>
        </v-avatar>
        <h1>Categorías</h1>
      </div>
      <v-btn @click="add" color="primary" depressed>
        <v-icon left>mdi-folder-plus</v-icon>
        Agregar categoría</v-btn
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
          <v-icon left>mdi-folder-edit</v-icon>
          Editar</v-btn
        >
        <v-btn
          class="text-none"
          @click="deleted(item)"
          color="#EC5D57"
          small
          text
        >
          <v-icon left>mdi-folder-remove</v-icon>
          Eliminar</v-btn
        >
      </template>
    </v-data-table>

    <component
      :is="component"
      :dialog="dialog"
      :data="deleteData"
      :isEdit="isEdit"
      :item="itemSelected"
      @close="close"
      @delete="deleteItem"
      @newItem="newItem"
      @updatedItem="updatedItem"
    />
  </v-container>
</template>

<script>
import { db } from "../helpers/Firebase";
import Bus from "../helpers/EventBus";

export default {
  name: "Categorias",
  mounted() {
    this.getData();
  },
  components: {
    Delete: () => import("../components/core/Delete.vue"),
    AgregarEditar: () =>
      import("../components/categoria/CategoriaAgregarEditar.vue"),
  },
  data: () => ({
    dialog: false,
    isEdit: false,
    deleteData: {},
    component: "",
    itemSelected: {},
    items: [],
    loading: false,
    headers: [
      {
        text: "ID",
        value: "id",
      },
      {
        text: "Nombre",
        value: "nombre",
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
        const { docs } = await db.collection("categorias").get();

        const items = [];

        docs.forEach((e) => {
          const item = {};
          item.nombre = e.data().nombre;
          item.id = e.id;

          items.push(item);
        });

        this.items = items;
      } catch (error) {
        console.warn(error);
      }
    },
    add() {
      this.isEdit = false;
      this.component = "AgregarEditar";
      this.dialog = true;
    },
    close() {
      this.isEdit = false;
      this.dialog = false;
    },
    edit(item) {
      this.itemSelected = item;
      this.isEdit = true;
      this.component = "AgregarEditar";
      this.dialog = true;
    },
    deleted(item) {
      this.itemSelected = item;
      this.component = "Delete";
      this.deleteData = {
        icon: "mdi-folder-remove",
        title: "Eliminar categoría",
        body: `<h3>¿Desea eliminar la categoría ${item.nombre}?</h3><h4>Este cambio no podrá ser revertido.</h4>`,
      };
      this.dialog = true;
    },
    async deleteItem() {
      try {
        await db.collection("categorias").doc(this.itemSelected.id).delete();
        await this.getData();
        Bus.$emit("toast", {
          type: "success",
          message: "Categoría eliminada con éxito!",
        });
        this.close();
      } catch (error) {
        console.warn(error);
      }
    },
    async newItem() {
      await this.getData();
      this.close();
      Bus.$emit("toast", {
        type: "success",
        message: "Categoría creada con éxito!",
      });
    },
    async updatedItem() {
      await this.getData();
      this.close();
      Bus.$emit("toast", {
        type: "success",
        message: "Categoría actualizada con éxito!",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>