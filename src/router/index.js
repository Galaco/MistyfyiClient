import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home";
import Callback from "../pages/Callback";
import Servers from "../pages/Servers";
import { requireAuth } from './../utils/auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "callback",
      path: "/callback",
      component: Callback,
    },
    {
      name: "servers",
      path: "/servers",
      component: Servers,
      beforeEnter: requireAuth,
    }
  ]
});
