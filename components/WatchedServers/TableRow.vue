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
    <td class="controls" align="center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            v-on="on"
            @click="history"
          >
            <v-icon>mdi-history</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('servers.servers.buttons.history') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="pink"
            v-on="on"
            @click="deleteServer"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('servers.servers.buttons.delete') }}</span>
      </v-tooltip>
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
