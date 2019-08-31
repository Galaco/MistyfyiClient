import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import VueToasted from 'vue-toasted';
import VueCookies from 'vue-cookies';
import VueMaterial from 'vue-material';
import VueI18n from 'vue-i18n';
import locale from './locale';

Vue.use(VueMaterial);
Vue.use(VueToasted);
Vue.toasted.register('api_error', (payload) => {
  if(! payload.message) {
    return "There was an issue communicating with the server."
  }
  return `An error occurred: ${payload.message}`;
}, {
  position: 'top-center',
  duration: 5000,
  fullWidth: true,
  fitToScreen: true,
  type: 'error'
});
Vue.toasted.register('api_success', (payload) => {
  return payload.message;
}, {
  position: 'top-center',
  duration: 5000,
  fullWidth: true,
  fitToScreen: true,
  type: 'success'
});

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
