<template>
  <div class="login d-flex align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col lg="6" md="8" sm="10" cols="12">
          <h1 class="text-h4 font-weight-bold">Recuperar contraseña</h1>
          <h2 class="text-h6 font-weight-regular text-sm-h5">
            Favor de ingresar tu usuario
          </h2>
          <div class="mt-5">
            <v-text-field
              color="#2EBA73"
              class="rounded-pill"
              placeholder="Usuario"
              prepend-inner-icon="mdi-account"
              solo
            ></v-text-field>
          </div>

          <v-row class="d-flex justify-end">
            <v-col cols="12" sm="6">
              <v-btn
                @click="recuperarContrasena"
                block
                class="rounded-pill text-none font-weight-regular"
                color="#2EBA73"
                dark
                depressed
                >Recurar contraseña
                <v-icon right>mdi-chevron-double-right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//EventBus
import EventBus from "../helpers/EventBus";

export default {
  name: "RecuperarPassword",
  methods: {
    recuperarContrasena() {
      const data = {};
      data.message = "Se te enviará una nueva contraseña a tu correo";
      data.type = "success";

      EventBus.$emit("toast", data);
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #f4f6f5;
  min-height: 100%;
}
</style>