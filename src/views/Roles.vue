<template>
  <v-container>
    <div class="mb-5 d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-avatar class="mr-3" size="40" tile>
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/cmas-nanchital.appspot.com/o/roles.png?alt=media&token=edbf2984-5e75-4e4b-aa1a-b44d8e65f55f"
          ></v-img>
        </v-avatar>
        <h1>Roles</h1>
      </div>
      <v-btn @click="add" color="primary" depressed>
        <v-icon left>mdi-plus</v-icon>
        Agregar rol</v-btn
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
          <v-icon left>mdi-file-document-edit</v-icon>
          Editar</v-btn
        >
        <v-btn
          class="text-none"
          @click="deleted(item)"
          color="#EC5D57"
          small
          text
        >
          <v-icon left>mdi-delete</v-icon>
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
  name: "Roles",
  mounted() {
    this.getData();
  },
  components: {
    Delete: () => import("../components/core/Delete.vue"),
    AgregarEditar: () => import("../components/rol/RolCRU.vue"),
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
        const { docs } = await db.collection("roles").get();

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
        icon: "mdi-delete",
        title: "Eliminar rol",
        body: `<h3>¿Desea eliminar el rol ${item.nombre}?</h3><h4>Este cambio no podrá ser revertido.</h4>`,
      };
      this.dialog = true;
    },
    async deleteItem() {
      try {
        await db.collection("roles").doc(this.itemSelected.id).delete();
        await this.getData();
        Bus.$emit("toast", {
          type: "success",
          message: "Rol eliminada con éxito!",
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
        message: "Rol creada con éxito!",
      });
    },
    async updatedItem() {
      await this.getData();
      this.close();
      Bus.$emit("toast", {
        type: "success",
        message: "Rol actualizada con éxito!",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>