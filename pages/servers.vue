<template>
  <v-row>
    <v-col cols="12">
      <v-card
        single-line
        :sticky="false"
      >
        <v-card-text v-show="userProfile.isSubscribed === false">
          {{ $t('servers.servers.instructions.free') }}
        </v-card-text>
        <v-card-text v-show="userProfile.isSubscribed === true">
          {{ $t('servers.servers.instructions.paid') }}
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12">
      <WatchedServers />
    </v-col>

    <v-col cols="12">
      <WatchedMaps />
    </v-col>

    <EnableNotificationDialog
      :show="isEnableNotificationDialogVisible"
      @confirm="closeEnableNotificationsPopup"
      @deny="closeEnableNotificationsPopup"
    />
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import WatchedServers from '@/components/WatchedServers/WatchedServers.vue'
import EnableNotificationDialog from '@/components/Dialogs/EnableNotifications.vue'
import WatchedMaps from '@/components/WatchedMaps/WatchedMaps.vue'
import { FETCH_USER_PROFILE_END } from '@/store/mutations.type'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Servers',
  components: {
    EnableNotificationDialog,
    WatchedServers,
    WatchedMaps
  },
  data () {
    return {
      isEnableNotificationDialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  watch: {
    userProfile () {
      console.log('change')
      this.showNotificationDialog()
    }
  },
  mounted () {
    this.$store.subscribe((mutation: any) => {
      if (mutation.type !== FETCH_USER_PROFILE_END) {
        return
      }
      if (this.userProfile && this.userProfile.uuid.length > 0) {
        console.log(`User: ${this.userProfile.uuid}`)
        this.showNotificationDialog()
      }
    })
  },
  methods: {
    closeEnableNotificationsPopup () {
      this.isEnableNotificationDialogVisible = false
    },
    showNotificationDialog () {
      console.log(this.$OneSignal)
      this.$OneSignal.push(() => {
        console.log('OneSignal: ready')
        this.$OneSignal.isPushNotificationsEnabled((isEnabled: boolean) => {
          console.log('Show: dialog-notification-request')
          this.isEnableNotificationDialogVisible = !isEnabled
        })
      })
    }
  },
  head () {
    return {
      title: 'Servers'
    }
  }
})
</script>
