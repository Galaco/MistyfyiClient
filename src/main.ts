import Vue from 'vue';
import VueToasted from 'vue-toasted';
import VueMaterial from 'vue-material';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import router from './router';
import store from './store';
import locale from './locale';
import AuthPlugin from './plugins/auth0';
import OneSignalPlugin from './plugins/onesignal';
import {
  apiError,
  apiErrorConfiguration,
  apiSuccess,
  apiSuccessConfiguration,
} from '@/utils/toast/common';

Vue.use(AuthPlugin);
Vue.use(OneSignalPlugin);
Vue.use(VueMaterial);

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
