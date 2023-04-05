<template>
  <div>
    <v-card dark>
      <v-card-text>
        <v-simple-table>
          <thead>
          <tr>
            <th>{{ $t('home.about.preview.headers.server') }}</th>
            <th>{{ $t('home.about.preview.headers.map') }}</th>
            <th>{{ $t('home.about.preview.headers.game') }}</th>
            <th>{{ $t('home.about.preview.headers.players') }}</th>
            <th>{{ $t('home.about.preview.headers.updated') }}</th>
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
  name: 'MockInterfaceTable',
  components: {
    Row
  },
  data () {
    return {
      servers: [
        {
          name: 'Community dust2 Casual',
          current_map: 'de_dust2',
          game: 'Counterstrike: Global Offensive',
          players: '10/12',
          last_updated: '3 minutes ago'
        },
        {
          name: 'mity.fyi #1 custom map ONLY',
          current_map: 'one_4_nine',
          game: 'Left 4 Dead 2',
          players: '3/8',
          last_updated: '5 seconds ago'
        },
        {
          name: 'CSS buddiesHangout 24/7 Zombie Escape',
          current_map: 'ze_bioshock_v7_1',
          game: 'Counterstrike: Source',
          players: '64/64',
          last_updated: '1 hour ago'
        },
        {
          name: 'Misty.fyi TF2 24/7 Payload!',
          current_map: 'pl_upwards',
          game: 'Team Fortress 2',
          players: '29/32',
          last_updated: '30 seconds ago'
        }
      ]
    }
  }
})
</script>
