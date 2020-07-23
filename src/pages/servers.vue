<template>
  <v-container>
    <v-row>
      <PageInfoBox
        :subscribedText="$t('servers.instructions.paid')"
        :unsubscribedText="$t('servers.instructions.free')"
      />
      <v-col cols="12">
        <WatchedServers />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import PageInfoBox from "@/components/Layout/PageInfoBox.vue"
import WatchedServers from "@/components/WatchedServers/WatchedServers.vue"

export default Vue.extend({
  middleware: ["auth"],
  layout: "app",
  name: "Servers",
  transition: {
    css: true,
  },
  components: {
    PageInfoBox,
    WatchedServers,
  },
  head() {
    return {
      title: "Servers",
    }
  },
})
</script>
