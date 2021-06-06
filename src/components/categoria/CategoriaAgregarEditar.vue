<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="text-h5 mb-5">
        <v-icon color="black" left>{{
          isEdit ? "mdi-folder-edit" : "mdi-folder-plus"
        }}</v-icon>
        {{ isEdit ? "Editar" : "Crear" }} categoría
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            autofocus
            v-model="categoria"
            :rules="requiredRules"
            label="Categoría"
            placeholder="Escriba el nombre de la categoría"
            outlined
            dense
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="loading"
          class="text-none font-weight-regular"
          @click="$emit('close')"
          color="#EC5D57"
          text
        >
          <v-icon left>mdi-cancel</v-icon>
          Cancelar
        </v-btn>
        <v-btn
          :loading="loading"
          class="text-none font-weight-regular"
          @click="saveOrEdit"
          color="primary"
          depressed
          ><v-icon left>mdi-folder</v-icon>
          {{ isEdit ? "Editar" : "Crear" }} categoría
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../helpers/Firebase";

export default {
  name: "CategoriaAgregarEditar",
  mounted() {
    this.detectEdit();
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    valid: true,
    loading: false,
    categoria: "",
    requiredRules: [(v) => !!v || "El campo es requerido"],
  }),
  methods: {
    detectEdit() {
      this.$refs.form.reset();
      if (this.isEdit) this.categoria = this.item.nombre;
    },
    saveOrEdit() {
      if (!this.$refs.form.validate()) return;

      if (this.isEdit) {
        this.editItem();
        return;
      }

      this.saveItem();
    },
    async saveItem() {
      try {
        this.loading = true;
        await db.collection("categorias").doc().set({ nombre: this.categoria });
        this.$emit("newItem");
      } catch (error) {
        console.warn(error);
      }
    },
    async editItem() {
      try {
        this.loading = true;
        await db.collection('categorias').doc(this.item.id).update({nombre: this.categoria});
        this.$emit("updatedItem");
      } catch (error) {
        console.warn(error);
      }
    },
  },
  watch: {
    dialog: function () {
      this.detectEdit();

      if (this.dialog) {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>