import Vue from 'vue';
import VueToasted from 'vue-toasted';
import VueMaterial from 'vue-material';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import locale from './locale';
import AuthPlugin from './plugins/auth0';
import PushbotsPlugin from './plugins/pushbots';
import {
  apiError,
  apiErrorConfiguration,
  apiSuccess,
  apiSuccessConfiguration,
} from '@/utils/toast/common';
import VueStripeCheckout from 'vue-stripe-checkout';

Vue.use(AuthPlugin);
Vue.use(PushbotsPlugin);
Vue.use(VueMaterial);
Vue.use(VueStripeCheckout, {
  publishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
});

Vue.use(VueToasted);
Vue.toasted.register('api_error', apiError, apiErrorConfiguration);
Vue.toasted.register('api_success', apiSuccess, apiSuccessConfiguration);

Vue.use(VueI18n);
const i18n = locale(VueI18n);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h: any) => h(App),
}).$mount('#app');
