<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="text-h5 mb-5">
        <v-icon color="black" left>{{
          isEdit ? 'mdi-file-edit' : 'mdi-file-plus'
        }}</v-icon>
        {{ isEdit ? 'Editar' : 'Crear' }} servicio
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="doc.nombre"
            autofocus
            dense
            label="Nombre"
            placeholder="Ingresa el nombre del servicio"
            outlined
            :rules="requiredRules"
          ></v-text-field>
          <v-text-field
            v-model.number="doc.precio"
            dense
            label="Precio"
            type="number"
            prefix="$"
            placeholder="Ingresa el precio del servicio"
            outlined
            :rules="requiredRules"
          ></v-text-field>
          <v-text-field
            v-model.number="doc.cantidad"
            dense
            label="Cantidad"
            type="number"
            placeholder="Ingresa la cantidad"
            outlined
            :rules="cantidadRules"
          ></v-text-field>
          <v-select
            v-model="doc.categoria"
            dense
            :items="categorias"
            label="Categoria"
            outlined
            :rules="requiredRules"
          ></v-select>
          <v-textarea
            v-model="doc.descripcion"
            counter
            no-resize
            outlined
            label="Descripción"
            placeholder="Ingresa la descripción del servicio"
            :rules="textAreaRules"
          ></v-textarea>
          <input
            class="d-none"
            type="file"
            id="img"
            name="img"
            accept="image/*"
            ref="inputImage"
            @change="imageConvert"
          />
          <v-img :src="image" v-if="image !== ''"></v-img>
          <v-btn
            class="mt-3"
            @click="$refs.inputImage.click()"
            color="primary"
            block
            depressed
          >
            <v-icon left>mdi-image-plus</v-icon> Agregar imagen</v-btn
          >
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
          ><v-icon left> mdi-cancel</v-icon>
          Cancelar
        </v-btn>
        <v-btn
          :loading="loading"
          class="text-none font-weight-regular"
          color="primary"
          @click="isCreateOrEdit"
          depressed
        >
          <v-icon left> mdi-file-check</v-icon>
          {{ isEdit ? 'Editar' : 'Crear' }} servicio
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { db, storage } from '../../helpers/Firebase';

  export default {
    name: 'ServicioCRU',
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
      item: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      image: '',
      imageName: '',
      imageURL: '',
      imageFile: '',
      imagenActualizada: false,
      valid: true,
      loading: false,
      textAreaRules: [
        (v) => !!v || 'El campo es requerido',
        (v) =>
          (v && v.length <= 140) ||
          'El campo no puede tener mas de 140 caracteres',
      ],
      requiredRules: [(v) => !!v || 'El campo es requerido'],
      cantidadRules: [(v) => v >= 0 || 'El campo es requerido, valor mínimo 0'],
      doc: {},
      categorias: [],
    }),
    methods: {
      async init() {
        this.detectIsEdit();
        await this.getCategories();
      },
      async imageConvert(e) {
        const lector = new FileReader();
        this.imageFile = e.target.files[0];
        this.imageName = this.imageFile.name;

        lector.readAsDataURL(this.imageFile);

        lector.onload = () => {
          this.image = lector.result;
          this.imagenActualizada = true;
        };
      },
      async getCategories() {
        try {
          const { docs } = await db.collection('categorias').get();
          const categorias = [];

          docs.forEach((e) => categorias.push(e.data().nombre));

          this.categorias = categorias;
        } catch (error) {
          console.warn(error);
        }
      },
      detectIsEdit() {
        this.$refs.form.reset();
        this.doc = this.item;
        if (!this.doc.imgUrl) this.image = '';
        if (this.doc.imgUrl) this.image = this.doc.imgUrl;
        this.loading = false;
      },
      isCreateOrEdit() {
        if (!this.$refs.form.validate()) return;
        if (this.image == '') {
          alert('LA IMAGEN ES NECESARIA');
          return true;
        }

        if (this.isEdit) this.editItem();
        else this.createItem();
      },
      async createItem() {
        try {
          this.loading = true;
          await this.subirImagen();
          await db
            .collection('servicios')
            .doc()
            .set(this.doc);
          this.$emit('createdItem');
        } catch (error) {
          console.warn(error);
        }
      },
      async editItem() {
        try {
          this.loading = true;
          if (this.imagenActualizada) {
            await this.eliminarImagen(this.doc.rutaStorage);
            await this.subirImagen();
          }
          await db
            .collection('servicios')
            .doc(this.item.id)
            .update(this.doc);
          this.$emit('updatedItem');
        } catch (error) {
          console.warn(error);
        }
      },
      async eliminarImagen(rutaStorage) {
        try {
          await storage.child(rutaStorage).delete();
        } catch (error) {
          console.log(error);
        }
      },
      async subirImagen() {
        const nombre = new Date().getTime();
        const extension = this.imageName.split('.');
        console.log(`ENTREEE ${nombre}.${extension[extension.length - 1]}`);
        const ruta = `servicios/${nombre}.${extension[extension.length - 1]}`;
        try {
          const upload = await storage
            .child(ruta)
            .putString(this.image, 'data_url');
          console.log(upload);
          const urlImg = await upload.ref.getDownloadURL();
          this.doc.imgUrl = urlImg;
          this.doc.rutaStorage = ruta;
          console.log(this.doc);
        } catch (error) {
          console.log(error);
        }
      },
    },
    watch: {
      dialog: function() {
        this.detectIsEdit();
      },
    },
  };
</script>

<style lang="scss" scoped></style>
