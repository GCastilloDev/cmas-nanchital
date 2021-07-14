<template>
  <div>
    <div class="img__header white--text">
      <div class="img__content pt-5 pr-5">
        <div
          class="d-flex justify-center align-center loading__content"
          v-if="!show"
        >
          <div class="text-center">
            <div class="pb-5">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <span>Cargando estado del tiempo...</span>
          </div>
        </div>

        <div v-if="show">
          <h1 class="white--text text-h6 text-sm-h5 font-weight-bold mb-3">
            {{ ciudad }}
          </h1>
          <div class="mb-3">
            <p class="mb-0">Temperatura actual</p>
            <div class="d-flex justify-end align-end">
              <img :src="imagen" alt="" height="30px" />
              <span class="font-weight-bold">{{ temperatura }}</span>
            </div>
          </div>

          <div>
            <p class="mb-0">Sensación térmica</p>
            <div class="d-flex justify-end align-end">
              <img :src="imagen" alt="" height="30px" />
              <span class="font-weight-bold">{{ sensacionTermica }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <v-img  src="@/assets/header.jpg"></v-img> -->
    </div>

    <div class="container__bg">
      <v-container>
        <h2>Agua potable y drenaje sanitario</h2>
        <v-row>
          <v-col>
            <p>
              Desarrollar las actividades necesarias en el proceso de
              contratación para prestar los servicios públicos de agua potable
              y/o drenaje sanitario entre el Cliente y Servicios de Agua y
              Drenaje de Nanchital a través de cualquiera de sus Oficinas
              Comerciales; de una manera eficiente, con sentido de
              responsabilidad social y cumpliendo con estándares internacionales
              de calidad.
            </p>
          </v-col>
        </v-row>

        <section v-if="!overlay">
          <article
            class="white pa-5 mb-5"
            v-for="(item, index) in categorias"
            :key="index"
          >
            <h2 class="text-uppercase mb-5">{{ item.categoria }}</h2>
            <p class="text-h6 mb-5" v-if="item.servicios.length === 0">
              Por el momento no tenemos servicios registrados en esta categoría
              <span style="font-size:1rem;">&#128549;</span>
            </p>
            <v-row v-if="item.servicios.length > 0">
              <v-col
                md="3"
                sm="4"
                v-for="(servicio, index) in item.servicios"
                :key="index"
              >
                <v-card>
                  <v-img max-width="100%" :src="servicio.imgUrl"></v-img>
                  <v-card-title class="text-uppercase text-center">
                    {{ servicio.nombre }}
                  </v-card-title>
                  <v-card-text>
                    <p class="text-subtitle-1">
                      Precio: ${{ servicio.precio }}
                    </p>
                    <p class="text-subtitle-1 mb-0">
                      Descripción:
                    </p>
                    <p>{{ servicio.descripcion }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </article>
        </section>
        <v-skeleton-loader
          v-if="overlay"
          type="date-picker"
        ></v-skeleton-loader>
      </v-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { db } from '../helpers/Firebase';

export default {
  name: 'Home',
  async mounted() {
    await this.datosClima();
    await this.getCategoria();
  },
  data: () => ({
    ciudad: '',
    temperatura: '',
    sensacionTermica: '',
    imagen: '',
    show: false,
    overlay: true,
    servicios: [],
    categorias: {},
  }),
  methods: {
    async datosClima() {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=nanchital&units=metric&lang=es&appid=4dab257d25d0f100b931220c089613dc`
        );

        this.ciudad = data.name;
        this.temperatura = `${data.main.temp}°С`;
        this.sensacionTermica = `${data.main.feels_like}°С`;
        this.imagen = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        this.show = true;
      } catch (error) {
        console.warn(error);
      }
    },
    async getCategoria() {
      try {
        const { docs } = await db.collection('categorias').get();

        const categorias = docs.map(async (e) => {
          const item = {};
          item.categoria = e.data().nombre;
          item.servicios = await this.getServicios(item.categoria);
          return item;
        });

        this.categorias = await Promise.all(categorias);
        this.overlay = false;
      } catch (error) {
        console.warn(error);
      }
    },
    async getServicios(categoria) {
      try {
        const { docs } = await db
          .collection('servicios')
          .where('categoria', '==', categoria)
          .get();
        return docs.map((e) => e.data());
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.img__header {
  background: url('../assets/header.jpg');
  background-image: no-repeat;
  background-image: fixed;
  background-image: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 80vh;
  text-align: right;
}

.img__content {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
}

.loading__content {
  height: 97%;
}

.container__bg {
  background-color: #f4f6f5;
}
</style>
