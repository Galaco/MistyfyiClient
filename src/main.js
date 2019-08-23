import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import VueToasted  from 'vue-toasted';
import VueCookies from 'vue-cookies';

Vue.use(VueToasted);
Vue.use(VueCookies);

Vue.config.productionTip = false;

VueCookies.config('30d');


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
