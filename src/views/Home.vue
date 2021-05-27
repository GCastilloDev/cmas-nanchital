<template>
  <div>
    <div class="img__header white--text">
      <div class="img__content pt-5 pr-5">
        <div v-if="show">
          <h1 class="white--text text-h5 font-weight-bold mb-3">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  mounted() {
    this.datosClima();
  },
  data: () => ({
    ciudad: "",
    temperatura: "",
    sensacionTermica: "",
    imagen: "",
    show: false,
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
  },
};
</script>

<style lang="css" scoped>
.img__header {
  background: url("../assets/header.jpg");
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
</style>
