<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="4">
        <v-card class="theme--dark">
          <v-card-title>
            <BrandLogo />
          </v-card-title>
          <v-card-text class="text-center">
            <span>{{ $t("header.links.redirecting") }}</span>
            <Spinner :size="16" :width="2" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import BrandLogo from "@/components/Layout/BrandLogo.vue"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"

export default Vue.extend({
  middleware: ["auth"],
  layout: "empty",
  name: "Callback",
  components: {
    BrandLogo,
    Spinner,
  },
  head() {
    return {
      title: "Logging you in...",
    }
  },
})
</script>
