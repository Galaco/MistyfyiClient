<template>
  <div class="list-view">
    <v-simple-table>
      <thead v-if="servers.length > 0">
        <tr>
          <th>{{ $t('servers.list.headers.server') }}</th>
          <th>{{ $t('servers.list.headers.address') }}</th>
          <th>{{ $t('servers.list.headers.map') }}</th>
          <th>{{ $t('servers.list.headers.updated') }}</th>
          <th class="controls">
            {{ $t('table.headers.actions') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <Row
          v-for="(server,index) in servers"
          :key="index"
          :server="server"
          @delete="showDelete"
          @history="showHistory"
        />
      </tbody>
    </v-simple-table>
    <div v-if="serversCount === -1" class="row text-center">
      <div class="col-sm-12 loading-spinner">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Row from './TableRow.vue'
import { SELECT_SERVER } from '@/store/actions.type'
import Server from '@/models/api/servers/Server'

export default Vue.extend({
  name: 'TableView',
  components: {
    Row
  },
  computed: {
    ...mapGetters(['servers', 'serversCount', 'serverSelected'])
  },
  methods: {
    showHistory (server: Server) {
      this.$store.dispatch(SELECT_SERVER, server)
      this.$emit('showHistory')
    },
    showDelete (server: Server) {
      this.$store.dispatch(SELECT_SERVER, server)
      this.$emit('showDelete')
    }
  }
})
</script>

<style lang='scss' scoped>
    .list-view {
        th.controls {
            text-align: center;
            width: 160px;
            min-width: 160px;
        }
    }

    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
