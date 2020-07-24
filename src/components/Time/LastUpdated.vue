<template>
  <small class="text-muted">{{ formatted }}</small>
</template>

<script lang="ts">
import Vue from "vue"
import { format } from "timeago.js"

export default Vue.extend({
  name: "LastUpdated",
  props: {
    date: {
      type: Number,
      default: () => 0,
    },
  },
  data: () => ({
    formatted: "",
    refreshTimeout: -1,
  }),
  watch: {
    date() {
      this.formatted = format(new Date(this.date * 1000), "en_US")
    },
  },
  destroyed() {
    clearInterval(this.refreshTimeout)
  },
  mounted() {
    this.refresh()

    this.refreshTimeout = setInterval(this.refresh, 30000)
  },
  methods: {
    refresh() {
      if (this.date > 0) {
        this.formatted = format(new Date(this.date * 1000), "en_US").toString()
      } else {
        this.formatted = this.$t(
          "servers.server.updated.notResponding"
        ).toString()
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.text-muted {
  text-transform: capitalize;
}
</style>