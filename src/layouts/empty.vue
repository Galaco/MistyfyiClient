<template>
  <v-app dark>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-content>

    <v-footer dark>
      <Footer />
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import Footer from "@/components/Layout/Footer.vue"

export default Vue.extend({
  name: "Empty",
  components: {
    Footer,
  },
})
</script>

<style lang="scss" scoped>
body {
  .theme--light.v-application {
    background-color: #121212;
  }
}
</style>
