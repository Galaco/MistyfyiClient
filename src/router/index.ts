import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import Callback from '../pages/Callback.vue';
import Servers from '../pages/Servers.vue';
import { requireAuth } from '../utils/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      meta: {
        title: 'MapTracker - Know when communities you love play maps you love',
        staticPage: true,
      },
    },
    {
      name: 'callback',
      path: '/callback',
      component: Callback,
      meta: {
        staticPage: false,
      },
    },
    {
      name: 'servers',
      path: '/servers',
      component: Servers,
      beforeEnter: requireAuth,
      meta: {
        title: 'MapTracker - Watched Servers',
        header: 'Servers',
        staticPage: false,
      },
    },
  ],
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
