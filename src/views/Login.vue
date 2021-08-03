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
              v-model="correo"
              color="#2EBA73"
              class="rounded-pill"
              placeholder="Correo"
              prepend-inner-icon="mdi-email"
              solo
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model="password"
              color="#2EBA73"
              class="rounded-pill"
              placeholder="Contraseña"
              prepend-inner-icon="mdi-lock"
              type="password"
              solo
            ></v-text-field>
          </div>
          <v-row>
            <v-col cols="12" sm="12">
              <v-btn
                :loading="loading"
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
              v-if="false"
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
              <router-link :to="{ name: 'Registrate' }">
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
  import EventBus from '../helpers/EventBus';

  //DB
  import { db } from '../helpers/Firebase';

  import { mapActions } from 'vuex';

  export default {
    name: 'Login',
    data: () => ({
      correo: '',
      password: '',
      loading: false,
      rol: {
        admin: 'Admin',
        user: 'Cart',
      },
    }),
    methods: {
      ...mapActions(['sessionInit']),
      async iniciarSesion() {
        this.loading = true;
        const data = {};
        const user = await this.obtenerUsuario(this.correo, this.password);

        if (user.empty) {
          data.message = 'Credenciales invalidas, intente de nuevo!';
          data.type = 'error';
          EventBus.$emit('toast', data);
          this.loading = false;
          return;
        }

        const id = user.docs[0].id;
        const userData = user.docs[0].data();
        delete userData.password;

        const ruta = userData.rol;

        this.guardarSesion({ id, ...userData });

        data.message = 'Inicio de sesión exitosa!';
        data.type = 'success';

        EventBus.$emit('toast', data);
        this.$router.push({ name: this.rol[ruta] });
      },
      async obtenerUsuario(correo, password) {
        try {
          const user = await db
            .collection('usuarios')
            .where('correo', '==', correo)
            .where('password', '==', password)
            .limit(1)
            .get();

          return user;
        } catch (error) {
          console.warn(error);
        }
      },
      guardarSesion(user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.sessionInit(user);
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
