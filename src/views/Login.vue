<template>
  <div class="login d-flex align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col lg="6" md="8" sm="10" cols="12">
          <h2 class="text-h4 font-weight-bold">Bienvenido de nuevo!</h2>
          <h1 class="text-h6 font-weight-regular text-sm-h5">
            Favor de iniciar sesión en tu cuenta
          </h1>
          <div class="mt-5">
            <v-text-field
              color="#2EBA73"
              class="rounded-pill"
              placeholder="Usuario"
              prepend-inner-icon="mdi-account"
              solo
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              color="#2EBA73"
              class="rounded-pill"
              placeholder="Contraseña"
              prepend-inner-icon="mdi-lock"
              type="password"
              solo
            ></v-text-field>
          </div>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn
                @click="iniciarSesion"
                block
                class="rounded-pill text-none font-weight-regular"
                color="#2EBA73"
                dark
                depressed
                >Iniciar sesión</v-btn
              >
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="d-flex align-end justify-sm-end justify-center"
            >
              <router-link :to="{ name: 'RecuperarPassword' }" class="link">
                Recuperar contraseña
              </router-link>
            </v-col>
            <v-col cols="12" class="text-center"
              ><span>¿No tienes cuenta? </span>
              <router-link :to="{ name: 'RecuperarPassword' }">
                Registrate aquí
              </router-link>
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
  name: "Login",
  data: () => ({}),
  methods: {
    iniciarSesion() {
      const data = {};
      data.message = "Inicio de sesión exitosa!";
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