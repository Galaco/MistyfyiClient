<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          single-line
          :sticky="false"
        >
          <v-card-text v-show="userProfile.isSubscribed === false">
            {{ $t('servers.instructions.free') }}
          </v-card-text>
          <v-card-text v-show="userProfile.isSubscribed === true">
            {{ $t('servers.instructions.paid') }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <WatchedServers />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import WatchedServers from '@/components/WatchedServers/WatchedServers.vue'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Servers',
  transition: {
    css: true
  },
  components: {
    WatchedServers
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  head () {
    return {
      title: 'Servers'
    }
  }
})
</script>
