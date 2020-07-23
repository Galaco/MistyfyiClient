<template>
  <v-col cols="12" class="pageInfoBox">
    <v-card single-line :sticky="false">
      <v-card-text v-show="userProfile.isSubscribed === false">
        {{ unsubscribedText }}
      </v-card-text>
      <v-card-text v-show="userProfile.isSubscribed === true">
        {{ subscribedText }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"

export default Vue.extend({
  name: "PageInfoBox",
  computed: {
    ...mapGetters(["userProfile"]),
  },
  props: {
    subscribedText: {
      type: String,
      default: () => "",
    },
    unsubscribedText: {
      type: String,
      default: () => "",
    },
  },
})
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 585px) {
  .pageInfoBox {
    display: none;
  }
}
</style>
