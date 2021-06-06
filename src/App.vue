<template>
  <v-app>
    <barra-navegacion></barra-navegacion>

    <v-main>
      <router-view />
    </v-main>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="typeSnackBar === 'success' ? 'primary' : 'red'"
      top
      right
      >{{ messageSnackBar }}</v-snackbar
    >
  </v-app>
</template>

<script>
// EventBus
import EventBus from "./helpers/EventBus";

import { mapActions } from "vuex";

export default {
  name: "App",
  mounted() {
    this.init();
  },
  components: {
    BarraNavegacion: () => import("./components/core/BarraNavegacion"),
  },
  data: () => ({
    snackbar: false,
    timeout: 2000,
    messageSnackBar: "",
    typeSnackBar: "success",
  }),
  methods: {
    ...mapActions(["sessionInit"]),
    init() {
      this.detectarSession();
      EventBus.$on("toast", (data) => this.showToast(data));
    },
    showToast(data) {
      this.messageSnackBar = data.message;
      this.typeSnackBar = data.type;
      this.snackbar = true;
    },
    detectarSession() {
      if (sessionStorage.getItem("user") === null) return true;

      const user = JSON.parse(sessionStorage.getItem("user"));
      this.sessionInit(user);
    },
  },
};
</script>

<style lang="css" scoped>
</style>
