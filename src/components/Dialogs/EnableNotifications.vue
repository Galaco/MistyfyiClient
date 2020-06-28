<template>
  <v-dialog
    id="enableNotificationsDialog"
    v-model="show"
    max-width="600px"
    @md-clicked-outside="close"
  >
    <v-card>
      <v-card-title class="headline">
        {{ $t("dialog.notifications.title") }}
      </v-card-title>
      <v-card-text>
        {{ $t("dialog.notifications.body") }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit">
          {{ $t("dialog.notifications.confirm") }}
        </v-btn>
        <v-btn @click="close">
          {{ $t("dialog.notifications.deny") }}
        </v-btn>
        <v-btn @click="closeForever">
          {{ $t("dialog.notifications.denyForever") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import { FETCH_USER_PROFILE } from "@/store/actions.type"

export const NEVER_SHOW_DIALOG = "hideNotificationDialog"

export default Vue.extend({
  name: "EnableNotifications",
  props: {
    show: Boolean,
  },
  computed: {
    ...mapGetters(["userProfile"]),
  },
  methods: {
    submit() {
      this.$OneSignal.push(() => {
        this.$OneSignal.on("subscriptionChange", (isSubscribed: boolean) => {
          console.log(
            "You have changed notification subscription status:",
            isSubscribed
          )
          if (isSubscribed) {
            this.$store.dispatch(FETCH_USER_PROFILE).then(() => {
              if (
                this.userProfile &&
                this.userProfile.uuid &&
                this.userProfile.uuid.length > 0
              ) {
                this.$OneSignal.push(() => {
                  this.$OneSignal.setExternalUserId(this.userProfile.uuid)
                })
                this.$OneSignal.push(() => {
                  this.$OneSignal.setEmail(this.$auth.user.email)
                })

                this.close()
              }
            })
          }
        })
      })
      this.$OneSignal.showNativePrompt()
    },
    close() {
      this.$emit("deny")
    },
    closeForever() {
      this.$localStorage.setItem(NEVER_SHOW_DIALOG, true)
      this.$emit("deny")
    },
  },
})
</script>
