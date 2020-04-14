<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ $t('popular.servers.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-simple-table v-if="isPopularItemsLoading === false">
        <thead v-if="popularItems.servers.length > 0">
          <tr>
            <th>{{ $t('servers.list.headers.server') }}</th>
            <th class="controls">
              {{ $t('table.headers.actions') }}
            </th>
          </tr>
        </thead>
        <tbody v-if="popularItems.servers.length > 0">
          <Item
            v-for="(server,index) in popularItems.servers"
            :key="index"
            :server="server"
            :can-user-add="servers.find(s => s.id === server.id) === null"
          />
        </tbody>
      </v-simple-table>
      <div v-if="isPopularItemsLoading === true" class="row text-center">
        <div class="loading-spinner">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Item from './Item.vue'

export default Vue.extend({
  name: 'PopularServers',
  components: {
    Item
  },
  computed: {
    ...mapGetters(['popularItems', 'isPopularItemsLoading', 'servers'])
  }
})
</script>

<style lang='scss' scoped>
  .controls {
    text-align: center;
  }
</style>
