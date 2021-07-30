<template>
  <div class="login d-flex align-center">
    <v-container>
      <v-row class="justify-center">
        <v-col lg="6" md="8" sm="10" cols="12">
          <h1 class="text-h4 font-weight-bold">Registro</h1>
          <h2 class="text-h6 font-weight-regular text-sm-h5">
            Favor de llenar el formulario
          </h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="mt-5">
              <p class="mb-1 label">Ingresa tu nombre</p>
              <v-text-field
                v-model="user.nombre"
                color="#2EBA73"
                placeholder="Nombre"
                prepend-inner-icon="mdi-account"
                solo
                :rules="requiredRules"
              ></v-text-field>
            </div>
            <div>
              <p class="mb-1 label">Ingresa tus apellidos</p>
              <v-text-field
                v-model="user.apellidos"
                color="#2EBA73"
                placeholder="Apellidos"
                prepend-inner-icon="mdi-account"
                solo
                :rules="requiredRules"
              ></v-text-field>
            </div>
            <div>
              <p class="mb-1 label">Ingresa tu correo</p>
              <v-text-field
                v-model="user.correo"
                color="#2EBA73"
                placeholder="Correo"
                prepend-inner-icon="mdi-email"
                solo
                :rules="emailRules"
              ></v-text-field>
            </div>
            <div v-if="false">
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
                v-model="user.password"
                color="#2EBA73"
                placeholder="Contraseña"
                prepend-inner-icon="mdi-lock"
                type="password"
                :rules="requiredRules"
                solo
              ></v-text-field>
            </div>
            <div v-if="false">
              <p class="mb-1 label">Repite tu contraseña</p>
              <v-text-field
                color="#2EBA73"
                placeholder="Contraseña"
                prepend-inner-icon="mdi-lock"
                type="password"
                solo
              ></v-text-field>
            </div>
          </v-form>
          <v-row class="d-flex justify-end">
            <v-col cols="12" sm="6">
              <v-btn
                @click="registarUsuario"
                :loading="loading"
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
import EventBus from '../helpers/EventBus';
import { db } from '../helpers/Firebase';

export default {
  name: 'Registrate',
  data: () => ({
    valid: true,
    loading: false,
    user: {
      nombre: '',
      apellidos: '',
      correo: '',
      password: '',
      rol: 'user',
    },
    emailRules: [
      (v) => !!v || 'Correo es requerido',
      (v) => /.+@.+\..+/.test(v) || 'Introduce un correo válido',
    ],
    requiredRules: [
      (v) => !!v || 'El campo es requerido',
      (v) =>
        (v && v.length >= 4) ||
        'El campo debe de contener al menos 4 caracteres',
    ],
  }),
  methods: {
    async registarUsuario() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      const data = {};
      data.message = 'Registro exitoso, bienvenido!';
      data.type = 'success';
      if (await this.existeCorreo()) {
        data.message = 'El correo que intenta registrar ya existe';
        data.type = 'fail';
        EventBus.$emit('toast', data);
        this.loading = false;
        return;
      }

      try {
        await db
          .collection('usuarios')
          .doc()
          .set(this.user);

        EventBus.$emit('toast', data);
        this.loading = false;
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.log(error);
      }
    },
    async existeCorreo() {
      try {
        const { empty } = await db
          .collection('usuarios')
          .where('correo', '==', this.user.correo)
          .get();
        return !empty;
      } catch (error) {
        console.log(error);
      }
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
  content: ' *';
  color: #cb042c;
}
</style>
