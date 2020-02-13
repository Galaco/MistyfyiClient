<template>
  <v-app>
    <v-navigation-drawer
      v-model="menuVisible"
      app
      clipped
    >
      <v-list dense>
        <v-list-item>
          <BrandLogo />
        </v-list-item>
        <v-divider
          class="mx-4"
          :inset="true"
          vertical
        />
        <v-list-item link :to="{ name: 'servers' }" exact>
          <v-list-item-action>
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('navigation.links.servers') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'help' }" exact>
          <v-list-item-action>
            <v-icon>mdi-help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('navigation.links.help') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      dense
      color="indigo darken-4"
    >
      <v-app-bar-nav-icon @click.stop="menuVisible = !menuVisible" />

      <v-toolbar-title>
        <BrandLogo />
      </v-toolbar-title>

      <v-toolbar-title>
        {{ this.$route.meta.header }}
      </v-toolbar-title>
      <!-- -->
      <v-spacer />

      <UserProfile />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <v-container>
        <!-- Provides the application the proper gutter -->
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      app
      dark
      absolute
      class="font-weight-medium"
    >
      <!-- -->
      <Footer />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import UserProfile from '@/components/Layout/UserProfile.vue'
import BrandLogo from '@/components/Layout/BrandLogo.vue'
import Footer from '@/components/Layout/Footer.vue'

export default Vue.extend({
  name: 'App',
  components: {
    UserProfile,
    BrandLogo,
    Footer
  },
  data: () => ({
    menuVisible: true
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
})
</script>
