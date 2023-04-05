<template>
  <v-footer dark>
    <v-container>
    <v-row align="center" justify="center">
      <v-btn

        class="text-none text-subtitle-1"
        color="#5865f2"
        variant="text"
      >
      </v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="text-center font-weight-medium" cols="12">
    <span class="attribution">
      <a rel="noopener noreferrer" target="blank" href="https://www.galaco.me">
        Galaco</a
      >
      - <strong>&copy;2020-{{ currentYear }}</strong>
    </span>
      </v-col>
    </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Footer",
  data: () => ({
    currentYear: new Date().getFullYear(),
  }),
})
</script>

<style lang="scss" scoped>

</style>
