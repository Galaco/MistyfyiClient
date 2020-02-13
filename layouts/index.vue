<template>
  <v-app>
    <v-app-bar
      app
      flat
      dark
    >
      <v-toolbar-title>
        <nuxt-link :to="{ name: 'index' }">
          <BrandLogo light />
        </nuxt-link>
      </v-toolbar-title>
      <!-- -->

      <v-spacer />

      <nuxt-link v-show="isLoggedIn()" id="toolbarOpenAppButton" :to="{ name: 'servers' }">
        <v-btn v-show="isLoggedIn()">
          <span class="text-white">{{ $t('header.links.openApp') }}</span>
        </v-btn>
      </nuxt-link>
      <v-btn v-show="isLoggedIn()" id="toolbarLogoutButton" @click="handleLogout()">
        <span>{{ $t('header.links.logout') }}</span>
      </v-btn>
      <v-btn v-show="!isLoggedIn()" id="toolbarLoginButton" @click="handleLogin()">
        <span class="text-white">{{ $t('header.links.login') }}</span>
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-content>

    <v-footer app dark>
      <!-- -->
      <Footer />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import BrandLogo from '@/components/Layout/BrandLogo.vue'
import Footer from '@/components/Layout/Footer.vue'

export default Vue.extend({
  name: 'Home',
  components: {
    BrandLogo,
    Footer
  },
  methods: {
    handleLogin () {
      this.$auth.login()
    },
    handleLogout () {
      this.$auth.logout()
    },
    isLoggedIn (): boolean {
      return this.$auth.loggedIn
    }
  }
})
</script>
