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
import WatchedServers from './../components/WatchedServers/WatchedServers.vue'
import EnableNotificationDialog from './../components/Notification/EnableNotificationDialog.vue'
import WatchedMaps from './../components/WatchedMaps/WatchedMaps.vue'
// import { CHANGE_USER_0AUTH_PROFILE } from '@/store/actions.type'
// import { userInfo } from '@/plugins/auth0'

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
  mounted () {
    // this.$store.dispatch(CHANGE_USER_0AUTH_PROFILE, userInfo())
    // this.$onesignal.areNotificationPermissionsGranted().then((valid: boolean) => {
    //   if (valid) {
    //     this.$onesignal.autoResubscribe()
    //   }
    //   this.isEnableNotificationDialogVisible = !valid && !this.$localStorage.getItem(NEVER_SHOW_DIALOG)
    //   this.$store.dispatch(FETCH_USER_PROFILE).then(() => {
    //     this.$onesignal.setAlias(this.userProfile.uuid)
    //   })
    // }).catch((error) => {
    //   console.error(error)
    // })
  },
  methods: {
    closeEnableNotificationsPopup () {
      this.isEnableNotificationDialogVisible = false
    }
  },
  head () {
    return {
      title: 'Servers'
    }
  }
})
</script>
