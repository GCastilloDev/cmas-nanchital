<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="text-h5 mb-5">
        <v-icon left color="black">{{
          isEdit ? 'mdi-account-edit' : 'mdi-account-plus'
        }}</v-icon>
        {{ isEdit ? 'Editar' : 'Crear' }} usuario
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="usuario.nombre"
            :rules="requiredRules"
            autofocus
            label="Nombre"
            placeholder="Escriba el nombre del nuevo usuario"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="usuario.apellidos"
            :rules="requiredRules"
            label="Apellidos"
            placeholder="Escriba los apellidos nuevo usuario"
            outlined
            dense
          ></v-text-field>
          <v-select
            v-model="usuario.rol"
            :rules="requiredRules"
            dense
            :items="roles"
            label="Rol"
            outlined
          ></v-select>
          <v-text-field
            v-model="usuario.correo"
            :rules="emailRules"
            label="Correo"
            placeholder="Escriba el correo del nuevo usuario"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="usuario.password"
            :rules="requiredRules"
            type="password"
            label="Contraseña"
            placeholder="Escriba la contraseña del nuevo usuario"
            outlined
            dense
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="loading"
          class="text-none font-weight-regular"
          color="#EC5D57"
          text
          @click="$emit('close')"
        >
          <v-icon left>mdi-cancel</v-icon>
          Cancelar
        </v-btn>
        <v-btn
          :loading="loading"
          class="text-none font-weight-regular"
          color="primary"
          depressed
          @click="saveUser"
        >
          <v-icon left>mdi-account-check</v-icon>
          {{ isEdit ? 'Editar' : 'Crear' }} usuario
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from '../../helpers/Firebase';
import Bus from '../../helpers/EventBus';

export default {
  name: 'UsuarioAgregarEditar',
  mounted() {
    this.init();
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    usuario: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    valid: true,
    roles: [],
    loading: false,
    correoOriginal: '',
    // usuario: {
    //   nombre: "",
    //   apellidos: "",
    //   correo: "",
    //   password: "",
    //   rol: "",
    // },
    emailRules: [
      (v) => !!v || 'El campo es requerido',
      (v) => /.+@.+\..+/.test(v) || 'Correo no válido',
    ],
    requiredRules: [(v) => !!v || 'El campo es requerido'],
  }),
  methods: {
    init() {
      this.getRoles();
    },
    async getRoles() {
      try {
        const { docs } = await db.collection('roles').get();
        const roles = [];

        docs.forEach((e) => roles.push(e.data().nombre));

        this.roles = roles;
      } catch (error) {
        console.warn(error);
      }
    },
    async saveUser() {
      try {
        // if (!this.$refs.form.validate()) return;

        this.loading = true;

        if (this.isEdit) {
          await this.updateUser();
          return;
        }

        if (await this.emailExist()) {
          this.error();
          return;
        }

        await db
          .collection('usuarios')
          .doc()
          .set(this.usuario);
        this.$emit('updateData');
      } catch (error) {
        console.warn(error);
      }
    },
    error() {
      const data = {
        type: 'Error',
        message: `El correo ${this.usuario.correo} ya se encuentra registrado`,
      };
      this.loading = false;
      Bus.$emit(`toast`, data);
    },
    async updateUser() {
      try {
        if (this.usuario.correoOriginal !== this.usuario.correo) {
          if (await this.emailExist()) {
            this.error();
            return;
          }
        }
        const doc = this.usuario.id;
        delete this.usuario.id;
        delete this.usuario.correoOriginal;

        await db
          .collection('usuarios')
          .doc(doc)
          .update(this.usuario);
        this.$emit('editUser');
      } catch (error) {
        console.warn(error);
      }
    },
    async emailExist() {
      try {
        const { empty } = await db
          .collection('usuarios')
          .where('correo', '==', this.usuario.correo)
          .get();

        const emailExist = !empty;

        return emailExist;
      } catch (error) {
        console.warn(error);
      }
    },
  },
  watch: {
    dialog: function() {
      this.loading = false;
      if (this.dialog && !this.isEdit) {
        console.warn('ASDAADS');
        this.$refs.form.resetValidation();
        this.$refs.form.reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
