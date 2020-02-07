<template>
  <v-app>
    <v-app-bar
      app
      flat
      color="rgba(0,0,0,0)"
      class="navbar"
    >
      <v-toolbar-title>
        <router-link :to="{ name: 'index' }">
          <BrandLogo light />
        </router-link>
      </v-toolbar-title>
      <!-- -->

      <v-spacer />

      <router-link v-show="isLoggedIn()" id="toolbarOpenAppButton" :to="{ name: 'servers' }">
        <v-btn v-show="isLoggedIn()">
          <span class="text-white">{{ $t('header.links.openApp') }}</span>
        </v-btn>
      </router-link>
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
import BrandLogo from '@/components/Branding/BrandLogo.vue'
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
    isLoggedIn () {
      return this.$auth.isAuthenticated()
    }
  }
})
</script>
