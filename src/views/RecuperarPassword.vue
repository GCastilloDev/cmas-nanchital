<template>
  <div class="login d-flex align-center">
    <v-row class="justify-center">
      <v-col cols="5">
        <h1 class="text-h4 font-weight-bold">Recuperar contraseña</h1>
        <div class="mt-5">
          <p>Favor de ingresar tu usuario</p>
          <v-text-field
            color="#2EBA73"
            class="rounded-pill"
            placeholder="Usuario"
            prepend-inner-icon="mdi-account"
            solo
          ></v-text-field>
        </div>
        <v-row>
          <v-col cols="12" class="text-right">
            <v-btn
              @click="recuperarContrasena"
              class="rounded-pill text-none font-weight-regular px-7"
              color="#2EBA73"
              dark
              depressed
              >Recuperar contraseña
              <v-icon>mdi-chevron-double-right</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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