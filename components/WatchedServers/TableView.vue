<template>
  <div class="list-view">
    <v-simple-table>
      <thead v-if="servers.length > 0">
        <tr>{{ $t('servers.servers.list.headers.server') }}</tr>
        <tr>{{ $t('servers.servers.list.headers.address') }}</tr>
        <tr>{{ $t('servers.servers.list.headers.map') }}</tr>
        <tr>{{ $t('servers.servers.list.headers.updated') }}</tr>
        <tr class="controls">
          {{ $t('table.headers.actions') }}
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
        <MoonLoader />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import Row from './TableRow.vue'
import { SELECT_SERVER } from '@/store/actions.type'

export default Vue.extend({
  name: 'CardView',
  components: {
    MoonLoader,
    Row
  },
  computed: {
    ...mapGetters(['servers', 'serversCount', 'serverSelected'])
  },
  methods: {
    showHistory (server: any) {
      this.$store.dispatch(SELECT_SERVER, server)
      this.$emit('showHistory')
    },
    showDelete (server: any) {
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
