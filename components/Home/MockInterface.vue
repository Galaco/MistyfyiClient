<template>
  <div>
    <v-card dark>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th>{{ $t('servers.servers.list.headers.server') }}</th>
              <th>{{ $t('servers.servers.list.headers.address') }}</th>
              <th>{{ $t('servers.servers.list.headers.map') }}</th>
              <th>{{ $t('servers.servers.list.headers.updated') }}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <Row
              v-for="(server,index) in servers"
              :key="index"
              :server="server"
              @delete="() => {}"
              @history="() => {}"
            />
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Row from './MockInterfaceRow.vue'

export default Vue.extend({
  name: 'MockInterface',
  components: {
    Row
  },
  data () {
    return {
      servers: [
        {
          ip_address: '192.168.0.1',
          port: '27015',
          name: 'Counterstrike: Source',
          current_map: 'de_dust2',
          last_updated: 'Updated 1 hour ago'
        },
        {
          ip_address: '127.0.0.1',
          port: '27017',
          name: 'Counterstrike: Global Offensive',
          current_map: 'de_nuke',
          last_updated: 'Updated 5 minute ago'
        },
        {
          ip_address: '255.255.255.0',
          port: '27015',
          name: 'Killing Floor #1',
          current_map: 'kf_london',
          last_updated: 'Updated 5 seconds ago'
        }
      ]
    }
  }
})
</script>
