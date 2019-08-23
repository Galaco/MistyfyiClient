import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import VueToasted  from 'vue-toasted';
import VueCookies from 'vue-cookies';
import VueI18n from 'vue-i18n';
import locale from './locale';

Vue.use(VueToasted);
Vue.use(VueCookies);
VueCookies.config('30d');

Vue.use(VueI18n);
const i18n = locale(VueI18n);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
