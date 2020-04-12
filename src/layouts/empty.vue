<template>
  <v-app dark>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Empty'
})
</script>
