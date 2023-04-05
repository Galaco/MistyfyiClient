<template>
  <v-container>
    <v-row>
      <PageInfoBox
        :subscribedText="$t('notifications.instructions.paid')"
        :unsubscribedText="$t('notifications.instructions.free')"
      />
      <v-col cols="12" class="cols--notification-list">
        <WatchedMaps />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import PageInfoBox from "@/components/Layout/PageInfoBox.vue"
import WatchedMaps from "@/components/WatchedMaps/WatchedMaps.vue"
import { FETCH_SERVERS } from "@/store/actions.type"

export default Vue.extend({
  middleware: ["auth"],
  layout: "app",
  name: "Notifications",
  transition: {
    css: true,
  },
  components: {
    PageInfoBox,
    WatchedMaps,
  },
  mounted() {
    this.$store.dispatch(FETCH_SERVERS).catch(err => {
      this.$toast.error(err.message)
    })
  },
  head() {
    return {
      title: "Map Notifications",
    }
  },
})
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 585px) {
  .container {
    padding-top: 0;
  }

  .cols--notification-list {
    padding: 0;
  }
}
</style>

