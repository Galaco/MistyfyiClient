<template>
  <v-app>
    <v-navigation-drawer id="rootNavigationDrawer" v-model="menuVisible" app>
      <v-list dense nav>
        <v-list-item class="brand-logo" align="center">
          <BrandLogo />
        </v-list-item>
      </v-list>

      <v-divider class="mb-2" />

      <v-list dense>
        <v-list-item link :to="{name: 'manage-popular'}" exact rounded="xl">
          <v-list-item-action>
            <v-icon>mdi-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.links.popular") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-2" />

        <v-list-item link :to="{name: 'manage-feed'}" exact rounded="xl">
          <v-list-item-action>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.links.feed") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{name: 'manage-servers'}" exact rounded="xl">
          <v-list-item-action>
            <v-icon>mdi-playlist-star</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.links.servers") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{name: 'manage-notifications'}" exact rounded="xl">
          <v-list-item-action>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.links.notifications") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mb-2" />

        <v-list-item link :to="{name: 'help'}" exact rounded="xl">
          <v-list-item-action>
            <v-icon>mdi-help-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t("navigation.links.help") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-container slot="append">
        <UserProfile/>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar app flat color="#fff">
      <v-app-bar-nav-icon @click.stop="menuVisible = !menuVisible" />

      <v-toolbar-title>
        {{ $t(`navigation.links.${$route.name}`) }}
      </v-toolbar-title>
      <!-- -->
      <v-spacer />
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <nuxt />
    </v-main>

    <EnableNotificationDialog
      :show="isEnableNotificationDialogVisible"
      @confirm="closeEnableNotificationsPopup"
      @deny="closeEnableNotificationsPopup"
    />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import EnableNotificationDialog from "@/components/Dialogs/EnableNotifications.vue"
import UserProfile from "@/components/Layout/UserProfile.vue"
import BrandLogo from "@/components/Layout/BrandLogo.vue"
import Footer from "@/components/Layout/Footer.vue"
import Server from "@/models/api/servers/Server"
import { FETCH_USER_PROFILE, SERVER_UPDATED } from "@/store/actions.type"
import { FETCH_USER_PROFILE_END } from "@/store/mutations.type"

export default Vue.extend({
  name: "App",
  components: {
    UserProfile,
    BrandLogo,
    Footer,
    EnableNotificationDialog,
  },
  data: () => ({
    menuVisible: true,
    isEnableNotificationDialogVisible: false,
    areNotificationsEnabled: false,
  }),
  computed: {
    ...mapGetters(["userProfile"]),
  },
  watch: {
    userProfile() {
      this.showNotificationDialog()
    },
  },
  created() {
  },
  mounted() {
    this.$store
      .dispatch(FETCH_USER_PROFILE)
      .then(() => {
        console.log("User profile obtained")
      })
      .catch((err: Error) => {
        this.$toast.error(err.message)
      })

    // this.$OneSignal.push(() => {
    //   this.$OneSignal.on("notificationDisplay", (event: any) => {
    //     this.$store.dispatch(
    //       SERVER_UPDATED,
    //       new Server(
    //         event.data.id,
    //         "",
    //         0,
    //         event.data.name,
    //         event.data.currentMap,
    //         event.data.game,
    //         event.data.playerCount,
    //         event.data.maxPlayers,
    //         Math.floor(Date.now() / 1000)
    //       )
    //     )
    //   })
    // })
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
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
    closeEnableNotificationsPopup() {
      this.isEnableNotificationDialogVisible = false
    },
    showNotificationDialog() {
      // this.$OneSignal.push(() => {
      //   this.$OneSignal.isPushNotificationsEnabled((isEnabled: boolean) => {
      //     console.log("Show: dialog-notification-request: ", !isEnabled)
      //     this.areNotificationsEnabled = isEnabled
      //     this.isEnableNotificationDialogVisible = !isEnabled
      //   })
      // })
    },
  },
})
</script>

<style lang="scss">
* {
  font-family: "Source Sans Pro", sans-serif;
}

.theme--light.v-application {
  background: #f3f3f3;
}

#rootNavigationDrawer {
  background-color: #171a21;

  .v-list {
    padding-left: 15px;
    padding-right: 15px;

    .v-divider {
      border-color: rgba(255, 255, 255, 0.2);
    }

    .v-list-item {
      margin-bottom: 8px;
      color: white;

      i {
        color: white;
      }

      &.brand-logo {
        margin-bottom: 0;
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 20px;
      }

      &:before {
        border-radius: 64px;
        background: rgb(37,103,183);
        background: linear-gradient(40deg, rgba(37,103,183,1) 0%, rgba(215,113,238,1) 46%);
      }

      &:hover {
        &:before {
          border-radius: 64px;
          background: rgb(25,71,128);
          background: linear-gradient(40deg, rgba(25,71,128,1) 0%, rgba(151,80,167,1) 46%);
        }
      }

      &--active {
        &:before {
          background-color: #45a6ff;
        }
      }
    }

    .v-ripple__container {
      border-radius: 64px;
    }
  }
}
</style>
