<template>
  <div>
    <v-card class="instructions">
      <v-card-text>
        <span v-show="userProfile.isSubscribed === false" class="md-body-2">{{ $t('servers.servers.instructions.free') }}</span>
        <span v-show="userProfile.isSubscribed === true" class="md-body-2">{{ $t('servers.servers.instructions.paid') }}</span>
      </v-card-text>
    </v-card>

    <WatchedServers />
    <WatchedMaps />
    <EnableNotificationDialog
      :show="isEnableNotificationDialogVisible"
      @confirm="closeEnableNotificationsPopup"
      @deny="closeEnableNotificationsPopup"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import WatchedServers from './../components/WatchedServers/WatchedServers.vue'
import EnableNotificationDialog from './../components/Notification/EnableNotificationDialog.vue'
import WatchedMaps from './../components/WatchedMaps/WatchedMaps.vue'
import { CHANGE_USER_0AUTH_PROFILE } from '@/store/actions.type'
import { userInfo } from '@/plugins/auth0'

export default Vue.extend({
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
    this.$store.dispatch(CHANGE_USER_0AUTH_PROFILE, userInfo())
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

<style lang='scss' scoped>
    .instructions {
        padding:16px;
        margin-bottom: 16px;
    }
</style>
