<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <div id="toolbarProfileButton" v-on="on">
          <v-list>
          <v-list-item v-if="$auth.loggedIn">
            <v-list-item-title class="email-address">{{ $auth.user.email }}</v-list-item-title>
            <v-avatar size="32">
            <v-img v-if="$auth.user.picture" :src="$auth.user.picture" />
            <v-icon v-if="!$auth.user.picture">
              mdi-account-circle
            </v-icon>
          </v-avatar>
          </v-list-item>
          </v-list>
        </div>
      </template>

      <v-list dense>
        <v-list-item v-show="$auth.loggedIn">
          <v-list-item-action>
            <v-icon>{{
              !userProfile || !userProfile.isSubscribed
                ? "mdi-computer"
                : "mdi-star"
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="!userProfile || !userProfile.isSubscribed">
            <v-list-item-title>
              {{ $t("account.types.free") }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-show="userProfile && userProfile.isSubscribed">
            <v-list-item-title>
              {{ $t("account.types.paid") }}
            </v-list-item-title>
            {{ $t("header.profile.expiresAt") }}
            {{ DateToString(userProfile.dateExpires) }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item id="toolbarLogoutButton" @click="handleLogout()">
          <v-list-item-action>
            <v-icon>mdi-cancel</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("header.links.logout") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import { DateToDateString } from "@/locale/time"

export default Vue.extend({
  name: "UserProfile",
  computed: {
    ...mapGetters(["userProfile"]),
  },
  methods: {
    handleLogout() {
      this.$auth.logout()
    },
    DateToString(date: number): string {
      return DateToDateString(new Date(date * 1000))
    },
  },
})
</script>

<style lang="scss" scoped>
.email-address {
  font-size: 14px;
}
</style>
