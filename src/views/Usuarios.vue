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
      <v-btn @click="add" color="primary" depressed>
        <v-icon left>mdi-account-plus</v-icon>
        Agregar usuario</v-btn
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

    <component
      :is="component"
      :dialog="dialog"
      :data="deleteData"
      :isEdit="isEdit"
      :usuario="userSelected"
      @close="close"
      @updateData="updateData"
      @delete="deleteUser"
      @editUser="editUser"
    />
  </v-container>
</template>

<script>
import { db } from "../helpers/Firebase";
import Bus from "../helpers/EventBus";

export default {
  name: "Usuarios",
  mounted() {
    this.getData();
  },
  components: {
    AddAndEdit: () => import("../components/usuario/UsuarioAgregarEditar"),
    Delete: () => import("../components/core/Delete.vue"),
  },
  data: () => ({
    loading: true,
    component: "",
    dialog: false,
    deleteData: {},
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
    userSelected: {},
    isEdit: false,
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
    close() {
      this.isEdit = false;
      this.dialog = false;
    },
    edit(item) {
      this.isEdit = true;
      this.userSelected = Object.assign({}, item);
      this.userSelected.correoOriginal = this.userSelected.correo;
      this.component = "AddAndEdit";
      this.dialog = true;
    },
    deleted(item) {
      this.userSelected = item;
      this.deleteData = {
        icon: "mdi-account-remove",
        title: "Eliminar usuario",
        body: `<h2>¿Desea eliminar al usuario ${item.nombre}?</h2> <br /> Los cambios no se podrán revertir.`,
      };
      this.component = "Delete";
      this.dialog = true;
    },
    add() {
      this.userSelected = {
        nombre: "",
        apellidos: "",
        correo: "",
        password: "",
        rol: "",
      };
      this.isEdit = false;
      this.component = "AddAndEdit";
      this.dialog = true;
    },
    async updateData() {
      await this.getData();
      this.dialog = false;
      Bus.$emit("toast", {
        type: "success",
        message: "Usuario actualizado con éxito!",
      });
    },
    async deleteUser() {
      try {
        await db.collection("usuarios").doc(this.userSelected.id).delete();
        Bus.$emit("toast", {
          type: "success",
          message: "Usuario eliminado con éxito!",
        });
        await this.getData();
        this.dialog = false;
      } catch (error) {
        console.warn(error);
      }
    },
    async editUser() {
      this.userSelected = {
        nombre: "",
        apellidos: "",
        correo: "",
        password: "",
        rol: "",
      };
      await this.getData();
      this.isEdit = false;
      Bus.$emit("toast", {
        type: "success",
        message: "Usuario actualizado con éxito!",
      });
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>