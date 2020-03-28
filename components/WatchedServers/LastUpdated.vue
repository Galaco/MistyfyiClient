<template>
  <small class="text-muted">{{ formatted }}</small>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'timeago.js'

export default Vue.extend({
  name: 'LastUpdated',
  props: {
    date: {
      type: Number,
      default: () => 0
    }
  },
  data: () => ({
    formatted: ''
  }),
  watch: {
    date () {
      this.formatted = this.$t('servers.servers.server.updated.prefix').toString() +
        format(new Date(this.date * 1000), 'en_US')
    }
  },
  mounted () {
    if (this.date > 0) {
      this.formatted = this.$t('servers.servers.server.updated.prefix').toString() +
        format(new Date(this.date * 1000), 'en_US').toString()
    } else {
      this.formatted = this.$t('servers.servers.server.updated.notResponding').toString()
    }
  }
})
</script>
