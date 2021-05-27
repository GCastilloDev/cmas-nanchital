<template>
  <v-navigation-drawer v-model="localDrawer" absolute temporary right>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link>
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

      <v-list-item link>
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
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Cuidado del agua</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>Admin</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
  watch: {
    drawer: function () {
      if (this.drawer) this.localDrawer = true;
    },
    localDrawer: function () {
      if (!this.localDrawer) this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>