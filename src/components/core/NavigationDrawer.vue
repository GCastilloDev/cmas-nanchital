<template>
  <v-navigation-drawer
    class="overflow-hidden"
    v-model="localDrawer"
    absolute
    temporary
  >
    <v-list nav dense>
      <v-list-item link :to="{ name: 'Nosotros' }" active-class="activeClass">
        <v-list-item-content>
          <v-list-item-title>Nosotros</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group v-model="pagosActive" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title> Pagos </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          class="pl-10"
          v-for="child in pagos"
          :key="child.title"
          link
          :to="{ name: child.to }"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item link :to="{ name: 'Contacto' }" active-class="activeClass">
        <v-list-item-content>
          <v-list-item-title>Contacto</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group v-model="reportesActive" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title> Reportes </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          class="pl-10"
          v-for="child in reportes"
          :key="child.title"
          :to="{ name: child.to }"
          link
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-item
        link
        :to="{ name: 'CuidadoDelAgua' }"
        active-class="activeClass"
      >
        <v-list-item-content>
          <v-list-item-title>Cuidado del agua</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="!session"
        link
        :to="{ name: 'Login' }"
        active-class="activeClass"
      >
        <v-list-item-content>
          <v-list-item-title
            ><span class="primary--text">Login</span></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="session"
        @click="closeSession"
        link
        :to="{ name: 'Home' }"
        color="white"
      >
        <v-list-item-content>
          <v-list-item-title
            ><span class="primary--text">Cerrar sesión</span></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="session && rol === 'admin'"
        link
        :to="{ name: 'Admin' }"
        active-class="activeClass"
      >
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="session && rol === 'user'"
        link
        :to="{ name: 'User' }"
        active-class="activeClass"
      >
        <v-list-item-content>
          <v-list-item-title>User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "NavigationDrawer",
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    localDrawer: false,
    pagosActive: false,
    reportesActive: false,
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
    ...mapActions(["cerrarSession"]),
    closeSession() {
      this.$emit("close", false);
      this.cerrarSession();
    },
  },
  computed: {
    ...mapState(["session", "rol"]),
  },
  watch: {
    drawer: function () {
      if (this.drawer) this.localDrawer = true;
    },
    localDrawer: function () {
      if (!this.localDrawer) this.$emit("close", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.activeClass {
  background-color: rgba(46, 186, 115, 0.01);
  color: rgb(46, 186, 115);
}
</style>