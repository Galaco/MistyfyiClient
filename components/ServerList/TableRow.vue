<template>
  <v-list-item
    ripple
    @click="onClick"
  >
    <div class="status-indicator">
      <v-badge
        v-if="server.name.length > 0"
        color="green"
        dot
      />
      <v-badge
        v-if="server.name.length === 0"
        color="red"
        dot
      />
    </div>

    <v-list-item-content>
      <span
        v-if="server.name.length > 0"
        class="text-uppercase font-weight-regular caption"
        v-text="server.name"
      />
      <span
        v-if="server.name.length === 0"
        class="text-uppercase font-weight-regular caption"
        v-text="`${server.ip_address}:${server.port}`"
      />
      <div
        v-if="server.current_map.length > 0"
        v-text="server.current_map"
      />
      <div
        v-if="server.current_map.length === 0"
        v-text="$t('feed.serverList.serverUnreachable')"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Server from '@/models/api/servers/Server'

export default Vue.extend({
  name: 'TableRow',
  props: {
    server: {
      type: Server,
      default: () => new Server(-1, '')
    }
  },
  methods: {
    onClick () {
      console.log(this.server)
    }
  }
})
</script>

<style lang="scss" scoped>
.status-indicator {
  width: 32px;
  height: 32px;
}
</style>
