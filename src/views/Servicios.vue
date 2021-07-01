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

    <v-autocomplete
      v-model="search"
      :items="categories"
      item-text="nombre"
      item-value="value"
      outlined
      dense
      label="Filtrar por categoria"
    ></v-autocomplete>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      :loading="loading"
      :search="search"
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
      :data="dataDelete"
      @close="close"
      @createdItem="createdItem"
      @updatedItem="updatedItem"
      @delete="deleteItem"
    />
  </v-container>
</template>

<script>
import { db } from '../helpers/Firebase';
import Bus from '../helpers/EventBus';

export default {
  name: 'Servicios',
  mounted() {
    this.getData();
  },
  components: {
    ServicioCRU: () => import('../components/servicio/ServicioCRU.vue'),
    Delete: () => import('../components/core/Delete.vue'),
  },
  data: () => ({
    dialog: false,
    isEdit: false,
    loading: false,
    component: '',
    search: '',
    dataDelete: {},
    items: [],
    categories: [],
    headers: [
      {
        text: 'Nombre',
        value: 'nombre',
      },
      {
        text: 'Categoria',
        value: 'categoria',
      },
      {
        text: 'Precio',
        value: 'precio',
      },
      {
        text: 'Acciones',
        value: 'actions',
      },
    ],
    itemSelected: {
      nombre: '',
      precio: 0,
      descripcion: '',
    },
  }),
  methods: {
    add() {
      this.itemSelected = {
        nombre: '',
        precio: 0,
        descripcion: '',
        categoria: '',
      };
      this.isEdit = false;
      this.component = 'ServicioCRU';
      this.dialog = true;
    },
    edit(item) {
      this.itemSelected = Object.assign({}, item);
      this.isEdit = true;
      this.component = 'ServicioCRU';
      this.dialog = true;
    },
    deleted(item) {
      this.itemSelected = Object.assign({}, item);
      this.dataDelete = {
        icon: 'mdi-file-remove',
        title: 'Eliminar servicio',
        body: `<h3>¿Desea eliminar el servicio ${item.nombre}?</h3><h4>Los cambios no podrán revertirse.</h4>`,
      };
      this.component = 'Delete';
      this.dialog = true;
    },
    close() {
      this.isEdit = false;
      this.dialog = false;
    },
    async getData() {
      try {
        this.loading = true;
        const { docs: categories } = await db.collection('categorias').get();
        const { docs } = await db.collection('servicios').get();

        this.categories = categories.map((e) => {
          return {
            value: e.data().nombre,
            nombre: e.data().nombre.toUpperCase(),
          };
        });

        this.categories.unshift({ value: '', nombre: 'TODAS' });

        this.items = docs.map((e) => {
          return {
            ...e.data(),
            id: e.id,
          };
        });
      } catch (error) {
        console.warn(error);
      } finally {
        this.loading = false;
      }
    },
    async createdItem() {
      await this.getData();
      this.close();
      Bus.$emit('toast', {
        type: 'success',
        message: 'Servicio creado con éxito!',
      });
    },
    async updatedItem() {
      await this.getData();
      this.close();
      Bus.$emit('toast', {
        type: 'success',
        message: 'Servicio actualizado con éxito!',
      });
    },
    async deleteItem() {
      try {
        await db
          .collection('servicios')
          .doc(this.itemSelected.id)
          .delete();
        await this.getData();
        this.close();
        Bus.$emit('toast', {
          type: 'success',
          message: 'Servicio eliminado con éxito!',
        });
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
