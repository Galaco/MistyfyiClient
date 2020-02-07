<template>
  <md-dialog id="enableNotificationsDialog" :md-active="show" @md-clicked-outside="close">
    <md-dialog-title>{{ $t('dialog.notifications.title') }}</md-dialog-title>
    <md-dialog-content>
      {{ $t('dialog.notifications.body') }}
    </md-dialog-content>
    <md-dialog-actions>
      <v-btn class="md-primary" @click="submit">
        {{ $t('dialog.notifications.confirm') }}
      </v-btn>
      <v-btn class="md-secondary" @click="close">
        {{ $t('dialog.notifications.deny') }}
      </v-btn>
      <v-btn class="md-secondary" @click="closeForever">
        {{ $t('dialog.notifications.denyForever') }}
      </v-btn>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export const NEVER_SHOW_DIALOG = 'hideNotificationDialog'

export default Vue.extend({
  name: 'EnableNotifications',
  props: {
    show: Boolean
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    submit () {
      // this.$onesignal.requestNotificationsPermission(() => {
      //   this.$onesignal.setEmail(this.$auth.user.email)
      //   this.$onesignal.setAlias(this.userProfile.uuid)
      //   this.close()
      // })
    },
    close () {
      this.$emit('deny')
    },
    closeForever () {
      this.$localStorage.set(NEVER_SHOW_DIALOG, true)
      this.$emit('deny')
    }
  }
})
</script>
