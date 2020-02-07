<template>
  <tr class="server">
    <td>
      {{ server.name }}
    </td>
    <td>
      {{ server.ip_address }}:{{ server.port }}
    </td>
    <td class="map-name">
      {{ server.current_map }}
    </td>
    <td class="last-updated">
      <LastUpdated :date="server.last_updated" />
    </td>
    <td class="controls">
      <div>
        <div>
          <v-btn @click="history">
            <v-icon>mdi-history</v-icon>
            <md-tooltip md-direction="bottom">
              {{ $t('servers.servers.buttons.history') }}
            </md-tooltip>
          </v-btn>
        </div>
        <div>
          <v-btn @click="deleteServer">
            <v-icon>mdi-delete</v-icon>
            <md-tooltip md-direction="bottom">
              {{ $t('servers.servers.buttons.delete') }}
            </md-tooltip>
          </v-btn>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import LastUpdated from './LastUpdated.vue'

export default Vue.extend({
  name: 'ServerRow',
  components: {
    LastUpdated
  },
  props: {
    server: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    history () {
      this.$emit('history', this.server)
    },
    deleteServer () {
      this.$emit('delete', this.server)
    }
  }
})
</script>

<style lang='scss' scoped>
  .controls {
    width: 160px;
    min-width: 160px;
  }
</style>
