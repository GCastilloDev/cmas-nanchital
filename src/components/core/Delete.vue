<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="text-h5 mb-5">
        <v-icon left color="black">{{ data.icon }}</v-icon>
        {{ data.title }}
      </v-card-title>
      <v-card-text class="text-center" v-html="data.body"> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          @click="deleted"
          :loading="loading"
          class="text-none font-weight-regular"
          color="#EC5D57"
          text
          depressed
        >
          <v-icon left>mdi-delete</v-icon>
          Si, eliminar
        </v-btn>

        <v-btn
          :disabled="loading"
          class="text-none font-weight-regular"
          color="primary"
          @click="$emit('close')"
          depressed
        >
          <v-icon left>mdi-cancel</v-icon>
          No, cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Delete",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    deleted() {
      this.loading = true;
      this.$emit("delete");
    },
  },
  watch: {
    dialog: function () {
      if (!this.dialog) this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>