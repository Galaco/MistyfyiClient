<template>
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-main>

    <Footer />
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
    background: rgb(2,0,36);
    background: linear-gradient(124deg, rgba(2,0,36,1) 0%, rgba(121,9,116,1) 35%, rgba(0,212,255,1) 100%);
  }
  .theme--dark.v-application {
    background: rgb(2,0,36);
    background: linear-gradient(124deg, rgba(2,0,36,1) 0%, rgba(121,9,116,1) 35%, rgba(0,212,255,1) 100%);
  }
}
</style>
