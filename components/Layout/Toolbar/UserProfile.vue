<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <div id="toolbarProfileButton" v-on="on">
          <div v-if="isLoggedIn()">
            {{ getUserEmail() }}
          </div>
          <v-avatar>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
        </div>
      </template>

      <v-list dense>
        <v-list-item v-show="isLoggedIn()">
          <v-list-item-action>
            <v-icon>{{ (!userProfile || !userProfile.isSubscribed)? "mdi-computer": "mdi-star" }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-if="!userProfile || !userProfile.isSubscribed">
            <v-list-item-title>
              {{ $t('account.types.free') }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-content v-show="userProfile && userProfile.isSubscribed">
            <v-list-item-title>
              {{ $t('account.types.paid') }}
            </v-list-item-title>
            {{ $t('header.profile.expiresAt') }} {{ DateToString(userProfile.dateExpires) }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-show="!isLoggedIn()" id="toolbarLoginButton" @click="handleLogin()">
          <v-list-item-title>{{ $t('header.links.login') }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-show="isLoggedIn()" id="toolbarLogoutButton" @click="handleLogout()">
          <v-list-item-action>
            <v-icon>mdi-cancel</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('header.links.logout') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { DateToDateString } from '@/locale/time'

export default Vue.extend({
  name: 'UserProfile',
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    handleLogin () {
      this.$auth.login()
    },
    handleLogout () {
      this.$auth.logout()
    },
    isLoggedIn (): boolean {
      return this.$auth.isAuthenticated()
    },
    getUserEmail (): string {
      return this.$auth.user.email
    },
    DateToString (date: number): string {
      return DateToDateString(new Date(date * 1000))
    }
  }
})
</script>

<style lang='scss' scoped>
    .user-email {
        margin-right: 8px;
        text-overflow: ellipsis;
        overflow-x: hidden;
    }
</style>
