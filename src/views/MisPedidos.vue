<template>
  <v-container>
    <v-data-table
      :headers="dessertHeaders"
      :items="items"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      show-expand
      class="elevation-1"
    >
      <template v-slot:item.fecha="{ item }">
        {{
          new Intl.DateTimeFormat('es-MX', { dateStyle: 'full' }).format(
            item.createdAt
          )
        }}
      </template>

      <template v-slot:item.totalProductos="{ item }">
        {{ item.products.length }}
      </template>

      <template v-slot:item.totalCompra="{ item }">
        {{ getTotalCompra(item.products) }}
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            ><h1>
              <v-icon color="primary" left>mdi-format-list-text</v-icon>Mis
              pedidos
            </h1>
          </v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <div class="pa-5">
          <v-row>
            <v-col
              cols="12"
              v-for="(product, index) in item.products"
              :key="index"
            >
              <p class="mb-0">Nombre: {{ product.title }}</p>
              <p class="mb-0">Precio: {{ product.unit_price }}</p>
              <p class="mb-0">Cantidad: {{ product.quantity }}</p>
              <p>Subtotal: {{ product.quantity * product.unit_price }}</p>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import { db } from '../helpers/Firebase';

  export default {
    name: 'MisPedidos',
    mounted() {
      this.getData();
    },
    data: () => ({
      items: [],
      expanded: [],
      singleExpand: false,
      dessertHeaders: [
        {
          text: 'Fecha de compra',
          align: 'start',
          sortable: false,
          value: 'fecha',
        },
        { text: 'Total productos y/o servicios', value: 'totalProductos' },
        { text: 'Total de la compra', value: 'totalCompra' },
        { text: '', value: 'data-table-expand' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }),
    methods: {
      getTotalCompra(products) {
        let total = 0;
        products.forEach((e) => {
          const subtotal = e.unit_price * e.quantity;
          total += subtotal;
        });

        return total;
      },
      async getData() {
        try {
          const userID = JSON.parse(sessionStorage.user).id;
          const { docs } = await db
            .collection('orders')
            .where('userID', '==', userID)
            .get();

          docs.forEach((e) => this.items.push({ id: e.id, ...e.data() }));
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
</script>

<style lang="scss" scoped></style>
