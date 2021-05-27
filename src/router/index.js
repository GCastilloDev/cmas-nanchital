import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/nosotros",
    name: "Nosotros",
    component: () =>
      import(/* webpackChunkName: "Nosotros" */ "../views/Nosotros.vue"),
  },
  {
    path: "/pagos/servicios",
    name: "PagoServicios",
    component: () =>
      import(
        /* webpackChunkName: "PagoServicios" */ "../views/PagoServicios.vue"
      ),
    meta: { pather: "pagos" },
  },
  {
    path: "/pagos/historial",
    name: "HistorialPagos",
    component: () =>
      import(
        /* webpackChunkName: "HistorialPagos" */ "../views/HistorialPagos.vue"
      ),
    meta: { pather: "pagos" },
  },
  {
    path: "/contacto",
    name: "Contacto",
    component: () =>
      import(/* webpackChunkName: "Contacto" */ "../views/Contacto.vue"),
  },
  {
    path: "/reportes/generar-reporte",
    name: "GenerarReporte",
    component: () =>
      import(
        /* webpackChunkName: "GenerarReporte" */ "../views/GenerarReporte.vue"
      ),
    meta: { pather: "reportes" },
  },
  {
    path: "/reportes/estatus-reporte",
    name: "EstatusReporte",
    component: () =>
      import(
        /* webpackChunkName: "EstatusReporte" */ "../views/EstatusReporte.vue"
      ),
    meta: { pather: "reportes" },
  },
  {
    path: "/cuidado-del-agua",
    name: "CuidadoDelAgua",
    component: () =>
      import(
        /* webpackChunkName: "CuidadoDelAgua" */ "../views/CuidadoDelAgua.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/login/recuperar-contrasena",
    name: "RecuperarPassword",
    component: () =>
      import(
        /* webpackChunkName: "RecuperarPassword" */ "../views/RecuperarPassword.vue"
      ),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "Admin" */ "../views/Admin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
