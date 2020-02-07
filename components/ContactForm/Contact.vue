<template>
  <form novalidate class="md-layout">
    <v-card class="md-layout-item md-size-100 md-small-size-100">
      <v-card-title class="headline">
        Contact
      </v-card-title>
      <v-card-text>
        <div>
          <div :class="(!emailAddressValid)? 'md-invalid': ''">
            <v-text-field
              id="email"
              v-model="emailAddress"
              name="email"
              :disabled="sending"
              :label="$t('help.contact.email.label')"
              required
            />
            <span class="md-error">{{ $t('help.contact.email.error') }}</span>
          </div>
          <div :class="(!messageValid)? 'md-invalid': ''">
            <v-text-field
              id="email"
              v-model="message"
              name="email"
              :disabled="sending"
              :label="$t('help.contact.message.label')"
              required
            />
            <span class="md-error">{{ $t('help.contact.message.error') }}</span>
          </div>
          <div>
            <vue-recaptcha
              :sitekey="recaptchaSiteKey"
              :load-recaptcha-script="true"
              @verify="onVerify"
              @expired="onExpired"
            />
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="button"
          :disabled="!formValid || sending"
          @click="send"
        >
          {{ $t('help.contact.submit') }}
        </v-btn>
      </v-card-actions>
      <v-progress-linear v-if="sending" indeterminate />
    </v-card>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import VueRecaptcha from 'vue-recaptcha'
import { sendContactRequest } from '../../utils/api/user'

const injectedRecaptchaSiteKey = process.env.NUXT_ENV_RECAPTCHA_SITE_KEY

// eslint-disable-next-line
const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export default Vue.extend({
  name: 'ContactForm',
  components: {
    VueRecaptcha
  },
  data: () => ({
    emailAddress: '',
    emailAddressValid: false,
    message: '',
    messageValid: false,
    formValid: false,
    sending: false,
    recaptchaSiteKey: injectedRecaptchaSiteKey,
    recaptchaAuthKey: ''
  }),
  watch: {
    emailAddress (value) {
      this.emailAddressValid = emailRegex.test(value)
      this.validateForm()
    },
    message (value) {
      this.messageValid = (value.length >= 50)
      this.validateForm()
    }
  },
  methods: {
    onVerify (response: any) {
      this.recaptchaAuthKey = response
      this.validateForm()
    },
    onExpired () {
      this.recaptchaAuthKey = ''
      this.validateForm()
    },
    send () {
      this.sending = true
      sendContactRequest(this.emailAddress, this.message, this.recaptchaAuthKey).then(() => {
        this.$toasted.global.api_success({
          message: this.$t('help.contact.toast.success')
        })
        this.emailAddress = ''
        this.message = ''
        this.onExpired()
        this.sending = false
      }).catch((err: any) => {
        this.$toasted.global.api_error({ message: err.message })
        this.sending = false
      })
    },
    validateForm () {
      this.formValid = this.emailAddressValid && this.messageValid && this.recaptchaAuthKey !== ''
    }
  }
})
</script>

<style lang='scss' scoped>
    .grecaptcha-badge {
        display: none !important;
    }
</style>
