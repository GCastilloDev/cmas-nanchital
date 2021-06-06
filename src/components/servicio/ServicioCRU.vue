<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="text-h5 mb-5">
        <v-icon color="black" left>{{
          isEdit ? "mdi-file-edit" : "mdi-file-plus"
        }}</v-icon>
        {{ isEdit ? "Editar" : "Crear" }} servicio
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="doc.nombre"
            autofocus
            dense
            label="Nombre"
            placeholder="Ingresa el nombre del servicio"
            outlined
            :rules="requiredRules"
          ></v-text-field>
          <v-text-field
            v-model.number="doc.precio"
            dense
            label="Precio"
            type="number"
            prefix="$"
            placeholder="Ingresa el precio del servicio"
            outlined
            :rules="requiredRules"
          ></v-text-field>
          <v-textarea
            v-model="doc.descripcion"
            counter
            no-resize
            outlined
            label="Descripción"
            placeholder="Ingresa la descripción del servicio"
            :rules="textAreaRules"
          ></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="loading"
          class="text-none font-weight-regular"
          color="#EC5D57"
          text
          @click="$emit('close')"
          ><v-icon left> mdi-cancel</v-icon>
          Cancelar
        </v-btn>
        <v-btn
          :loading="loading"
          class="text-none font-weight-regular"
          color="primary"
          @click="isCreateOrEdit"
          depressed
        >
          <v-icon left> mdi-file-check</v-icon>
          {{ isEdit ? "Editar" : "Crear" }} servicio
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../helpers/Firebase";

export default {
  name: "ServicioCRU",
  mounted() {
    this.detectIsEdit();
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
      required: true,
    },
  },
  data: () => ({
    valid: true,
    loading: false,
    textAreaRules: [
      (v) => !!v || "El campo es requerido",
      (v) =>
        (v && v.length <= 140) ||
        "El campo no puede tener mas de 140 caracteres",
    ],
    requiredRules: [(v) => !!v || "El campo es requerido"],
    doc: {},
  }),
  methods: {
    detectIsEdit() {
      this.$refs.form.reset();
      this.doc = this.item;
      this.loading = false;
    },
    isCreateOrEdit() {
      if (!this.$refs.form.validate()) return;

      if (this.isEdit) this.editItem();
      else this.createItem();
    },
    async createItem() {
      try {
        this.loading = true;
        await db.collection("servicios").doc().set(this.doc);
        this.$emit("createdItem");
      } catch (error) {
        console.warn(error);
      }
    },
    async editItem() {
      try {
        this.loading = true;
        await db.collection("servicios").doc(this.item.id).update(this.doc);
        this.$emit("updatedItem");
      } catch (error) {
        console.warn(error);
      }
    },
  },
  watch: {
    dialog: function () {
      this.detectIsEdit();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>