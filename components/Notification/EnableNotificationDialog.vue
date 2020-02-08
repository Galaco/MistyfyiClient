<template>
  <v-dialog id="enableNotificationsDialog" v-model="show" @md-clicked-outside="close">
    <v-card>
      <v-card-title class="headline">
        {{ $t('dialog.notifications.title') }}
      </v-card-title>
      <v-card-text>
        {{ $t('dialog.notifications.body') }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit">
          {{ $t('dialog.notifications.confirm') }}
        </v-btn>
        <v-btn @click="close">
          {{ $t('dialog.notifications.deny') }}
        </v-btn>
        <v-btn @click="closeForever">
          {{ $t('dialog.notifications.denyForever') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
