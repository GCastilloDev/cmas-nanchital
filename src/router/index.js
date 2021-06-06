import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const isAuthenticated = (to, from, next) => {
  if (sessionStorage.getItem("user") === null) {
    next({ name: "Login" });
    return;
  }

  const { rol } = JSON.parse(sessionStorage.getItem("user"));
  const rolGuard = to.meta.rol;

  if (rol === rolGuard) {
    next();
    return;
  }

  next({ name: "Error401" });
};

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
    path: "/login/registrate",
    name: "Registrate",
    component: () =>
      import(/* webpackChunkName: "Registrate" */ "../views/Registrate.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "Admin" */ "../views/Admin.vue"),
    meta: {
      rol: "admin",
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/admin/usuarios",
    name: "Usuarios",
    component: () =>
      import(/* webpackChunkName: "Usuarios" */ "../views/Usuarios.vue"),
    meta: {
      rol: "admin",
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/admin/categorias",
    name: "Categorias",
    component: () =>
      import(/* webpackChunkName: "Categorias" */ "../views/Categorias.vue"),
    meta: {
      rol: "admin",
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/admin/servicios",
    name: "Servicios",
    component: () =>
      import(/* webpackChunkName: "Servicios" */ "../views/Servicios.vue"),
    meta: {
      rol: "admin",
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/admin/roles",
    name: "Roles",
    component: () =>
      import(/* webpackChunkName: "Roles" */ "../views/Roles.vue"),
    meta: {
      rol: "admin",
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/usuario",
    name: "User",
    component: () => import(/* webpackChunkName: "User" */ "../views/User.vue"),
    meta: {
      rol: "user",
    },
    beforeEnter: isAuthenticated,
  },
  {
    path: "/401",
    name: "Error401",
    component: () =>
      import(/* webpackChunkName: "Error401" */ "../views/401.vue"),
  },
  {
    path: "*",
    name: "Error404",
    component: () =>
      import(/* webpackChunkName: "Error404" */ "../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
