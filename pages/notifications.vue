<template>
  <v-row>
    <v-col cols="12">
      <v-card
        single-line
        :sticky="false"
      >
        <v-card-text v-show="userProfile.isSubscribed === false">
          {{ $t('notifications.instructions.free') }}
        </v-card-text>
        <v-card-text v-show="userProfile.isSubscribed === true">
          {{ $t('notifications.instructions.paid') }}
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <WatchedMaps />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import WatchedMaps from '@/components/WatchedMaps/WatchedMaps.vue'
import { FETCH_SERVERS } from '@/store/actions.type'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Notifications',
  transition: {
    css: true
  },
  components: {
    WatchedMaps
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  mounted () {
    this.$store.dispatch(FETCH_SERVERS).catch((err) => {
      this.$toast.error(err.message)
    })
  },
  head () {
    return {
      title: 'Map Notifications'
    }
  }
})
</script>
