import Vue from 'vue'
import VueToasted from 'vue-toasted'
import {
  apiError,
  apiErrorConfiguration,
  apiSuccess,
  apiSuccessConfiguration
} from '@/utils/toast/common'

Vue.use(VueToasted)
Vue.toasted.register('api_error', apiError, apiErrorConfiguration)
Vue.toasted.register('api_success', apiSuccess, apiSuccessConfiguration)
