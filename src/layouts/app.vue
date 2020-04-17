<template>
  <v-app>
    <v-navigation-drawer
      id="rootNavigationDrawer"
      v-model="menuVisible"
      app
    >
      <v-list
        dense
        nav
      >
        <v-list-item class="brand-logo">
          <BrandLogo />
        </v-list-item>
      </v-list>

      <v-divider class="mb-2" />

      <v-list dense>
        <v-list-item link :to="{ name: 'feed' }" exact>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('navigation.links.feed') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'popular' }" exact>
          <v-list-item-action>
            <v-icon>mdi-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('navigation.links.popular') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-2" />

        <v-list-item link :to="{ name: 'servers' }" exact>
          <v-list-item-action>
            <v-icon>mdi-playlist-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('navigation.links.servers') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'notifications' }" exact>
          <v-list-item-action>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('navigation.links.notifications') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-2" />

        <v-list-item link :to="{ name: 'help' }" exact>
          <v-list-item-action>
            <v-icon>mdi-help-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('navigation.links.help') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <Footer />
      </template>
    </v-navigation-drawer>
    <v-app-bar
      app
      flat
      color="indigo darken-4"
    >
      <v-app-bar-nav-icon @click.stop="menuVisible = !menuVisible" />

      <v-toolbar-title>
        {{ $t(`navigation.links.${$route.name}`) }}
      </v-toolbar-title>
      <!-- -->
      <v-spacer />

      <UserProfile />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-content>

    <EnableNotificationDialog
      :show="isEnableNotificationDialogVisible"
      @confirm="closeEnableNotificationsPopup"
      @deny="closeEnableNotificationsPopup"
    />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import EnableNotificationDialog from '@/components/Dialogs/EnableNotifications.vue'
import UserProfile from '@/components/Layout/UserProfile.vue'
import BrandLogo from '@/components/Layout/BrandLogo.vue'
import Footer from '@/components/Layout/Footer.vue'
import Server from '@/models/api/servers/Server'
import { FETCH_USER_PROFILE, SERVER_UPDATED } from '@/store/actions.type'
import { FETCH_USER_PROFILE_END } from '@/store/mutations.type'

export default Vue.extend({
  name: 'App',
  components: {
    UserProfile,
    BrandLogo,
    Footer,
    EnableNotificationDialog
  },
  data: () => ({
    menuVisible: true,
    isEnableNotificationDialogVisible: false,
    areNotificationsEnabled: false
  }),
  computed: {
    ...mapGetters(['userProfile'])
  },
  watch: {
    userProfile () {
      this.showNotificationDialog()
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  mounted () {
    this.$store.dispatch(FETCH_USER_PROFILE).then(() => {
      console.log('User profile obtained')
    }).catch((err: Error) => {
      this.$toast.error(err.message)
    })

    this.$OneSignal.push(() => {
      this.$OneSignal.on('notificationDisplay', (event: any) => {
        this.$store.dispatch(SERVER_UPDATED, new Server(event.data.id, '', 0, event.data.name, event.data.currentMap, Math.floor(Date.now() / 1000)))
      })
    })
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
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    closeEnableNotificationsPopup () {
      this.isEnableNotificationDialogVisible = false
    },
    showNotificationDialog () {
      this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled((isEnabled: boolean) => {
          console.log('Show: dialog-notification-request: ', !isEnabled)
          this.areNotificationsEnabled = isEnabled
          this.isEnableNotificationDialogVisible = !isEnabled
        })
      })
    }
  }
})
</script>

<style lang="scss">
#rootNavigationDrawer {
  .v-list {
    padding-left: 15px;
    padding-right: 15px;

    .v-list-item {
      margin-bottom: 8px;

      &.brand-logo {
        margin-bottom: 0;
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 20px;
      }

      &:before {
        border-radius: 4px;
      }

      &--active {
        &:before {
          background-color: pink;
        }
      }
    }
  }
}
</style>
