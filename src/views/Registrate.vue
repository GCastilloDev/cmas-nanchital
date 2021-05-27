<template>
  <div class="login d-flex align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col lg="6" md="8" sm="10" cols="12">
          <h1 class="text-h4 font-weight-bold">Registro</h1>
          <h2 class="text-h6 font-weight-regular text-sm-h5">
            Favor de llenar el formulario
          </h2>
          <div class="mt-5">
            <p class="mb-1 label">Ingresa tu correo</p>
            <v-text-field
              color="#2EBA73"
              placeholder="Correo"
              prepend-inner-icon="mdi-email"
              solo
            ></v-text-field>
          </div>
          <div>
            <p class="mb-1 label">Ingresa tu número de servicio</p>
            <v-text-field
              color="#2EBA73"
              placeholder="Número de servicio"
              prepend-inner-icon="mdi-water-pump"
              type="number"
              solo
            ></v-text-field>
          </div>
          <div>
            <p class="mb-1 label">Ingresa tu contraseña</p>
            <v-text-field
              color="#2EBA73"
              placeholder="Contraseña"
              prepend-inner-icon="mdi-lock"
              type="password"
              solo
            ></v-text-field>
          </div>
          <div>
            <p class="mb-1 label">Repite tu contraseña</p>
            <v-text-field
              color="#2EBA73"
              placeholder="Contraseña"
              prepend-inner-icon="mdi-lock"
              type="password"
              solo
            ></v-text-field>
          </div>
          <v-row class="d-flex justify-end">
            <v-col cols="12" sm="6">
              <v-btn
                @click="registarUsuario"
                block
                class="rounded-pill text-none font-weight-regular"
                color="#2EBA73"
                dark
                depressed
                >Completar el registro
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
  name: "Registrate",
  methods: {
    registarUsuario() {
      const data = {};
      data.message = "Registro exitoso, bienvenido!";
      data.type = "success";

      EventBus.$emit("toast", data);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #f4f6f5;
  min-height: 100%;
}

.label {
  font-size: 0.9em;
  font-weight: 500;
  color: #575757;
}

.label::after {
  content: " *";
  color: #cb042c;
}
</style>