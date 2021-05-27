<template>
  <v-app>
    <v-app-bar app color="white" dark>
      <router-link :to="{ name: 'Home' }">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo-menu.png"
            transition="scale-transition"
            max-width="60%"
          />
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        class="black--text text-capitalize"
        color="white"
        depressed
        :to="{ name: 'Nosotros' }"
        >Nosotros</v-btn
      >
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="black--text text-capitalize"
            color="white"
            depressed
            v-bind="attrs"
            v-on="on"
          >
            Pagos <v-icon right> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in pagos"
            :key="index"
            link
            :to="{ name: item.to }"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        class="black--text text-capitalize"
        color="white"
        depressed
        :to="{ name: 'Contacto' }"
        >Contacto</v-btn
      >
      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="black--text text-capitalize"
            color="white"
            depressed
            v-bind="attrs"
            v-on="on"
          >
            Reportes <v-icon right> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in reportes"
            :key="index"
            link
            :to="{ name: item.to }"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        class="black--text text-capitalize"
        color="white"
        depressed
        :to="{ name: 'CuidadoDelAgua' }"
        >Cuidado del agua</v-btn
      >
      <v-btn
        class="rounded-pill text-capitalize"
        color="#01AB55"
        dark
        depressed
        :to="{ name: 'Login' }"
        >Login</v-btn
      >
      <v-btn
        class="black--text text-capitalize"
        color="white"
        depressed
        :to="{ name: 'Admin' }"
        >Admin</v-btn
      >
    </v-app-bar>

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

export default {
  name: "App",
  mounted() {
    this.init();
  },
  data: () => ({
    snackbar: false,
    timeout: 2000,
    messageSnackBar: "",
    typeSnackBar: "success",
    pagos: [
      {
        title: "Pago de servicios",
        to: "PagoServicios",
      },
      {
        title: "Historial de pagos",
        to: "HistorialPagos",
      },
    ],
    reportes: [
      {
        title: "Generar reporte",
        to: "GenerarReporte",
      },
      {
        title: "Estatus reporte",
        to: "EstatusReporte",
      },
    ],
  }),
  methods: {
    init() {
      EventBus.$on("toast", (data) => {
        this.showToast(data);
      });
    },
    showToast(data) {
      this.messageSnackBar = data.message;
      this.typeSnackBar = data.type;
      this.snackbar = true;
    },
  },
};
</script>

<style lang="css" scoped>
</style>
