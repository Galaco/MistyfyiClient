<template>
  <v-col
    class="text-center font-weight-medium"
    cols="12"
  >
    <span class="attribution">
      <a rel="noopener noreferrer" target="blank" href="https://www.galaco.me">
        Galaco</a> - <strong>&copy;{{ currentYear }}</strong>
    </span>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Footer',
  data: () => ({
    currentYear: new Date().getFullYear()
  })
})
</script>
