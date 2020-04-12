<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="10" sm="4">
        <v-card class="theme--dark">
          <v-card-title>
            <BrandLogo />
          </v-card-title>
          <v-card-text class="text-center">
            <p>
              {{ $t('app_title') }}{{ $t('footer.description') }}
            </p>
            <v-btn color="primary" @click="login">
              <span v-if="!autoRedirect"> {{ $t('header.links.login') }}</span>
              <span v-if="autoRedirect">
                {{ $t('header.links.redirecting') }}
                <v-progress-circular
                  :size="16"
                  :width="2"
                  color="purple"
                  indeterminate
                />
              </span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BrandLogo from '@/components/Layout/BrandLogo.vue'

export default Vue.extend({
  layout: 'empty',
  name: 'Login',
  components: {
    BrandLogo
  },
  data: () => ({
    autoRedirect: false
  }),
  mounted () {
    if (this.isLoggedIn() === true) {
      this.$router.push({ name: 'feed' })
    }
    if (String(this.$route.query.passthrough) === '1') {
      this.autoRedirect = true
      this.login()
    }
  },
  methods: {
    isLoggedIn (): boolean {
      return this.$auth.isLoggedIn
    },
    login () {
      if (this.autoRedirect) {
        return
      }
      this.$auth.login()
    }
  },
  head () {
    return {
      title: 'Login'
    }
  }
})
</script>
