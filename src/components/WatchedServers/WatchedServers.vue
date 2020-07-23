<template>
  <div class="server-list">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ $t("servers.title") }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          id="serverListRefreshButton"
          :disabled="serversCount === 0 || isServersLoading === true"
          @click="getPrivateServers"
        >
          <v-icon v-if="isServersLoading === false">
            mdi-refresh
          </v-icon>
          <Spinner v-if="isServersLoading === true" :size="16" :width="2" />
        </v-btn>
        <v-btn @click="showAddServerDialog">
          <v-icon>mdi-note-add</v-icon>
          <span>{{ $t("servers.buttons.add") }}</span>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <TableView
          v-if="serversCount > 0"
          @showHistory="showServerHistoryDialog"
          @showDelete="showDeleteServerDialog"
        />
        <NoItems
          v-if="serversCount < 1 && !isServersLoading"
          :title="$t('servers.noItems.title')"
          :description="$t('servers.noItems.description')"
          button-id="addFirstServerButton"
          :button-on-click="showAddServerDialog"
          :button-text="$t('servers.noItems.add')"
        />
        <Loading v-if="serversCount === -1" />
      </v-card-text>
    </v-card>
    <AddServerDialog
      :show="isNewServerDialogVisible"
      @deny="onCloseAddServerDialog"
      @confirm="onAddServerDialog"
    />
    <DeleteServerDialog
      :show="isDeleteServerDialogVisible"
      @deny="onCloseDeleteServerDialog"
      @confirm="onDeleteServerDialog"
    />
    <ServerHistoryDialog
      :show="isServerHistoryDialogVisible"
      :server="serverSelected"
      @deny="onCloseServerHistoryDialog"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import AddServerDialog from "./Dialogs/AddServer.vue"
import DeleteServerDialog from "./Dialogs/DeleteServer.vue"
import ServerHistoryDialog from "./Dialogs/History.vue"
import TableView from "./TableView.vue"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"
import NoItems from "@/components/Common/Table/NoItems.vue"
import Loading from "@/components/Common/Table/Loading.vue"
import {
  DELETE_SERVER,
  FETCH_SERVERS,
  SELECT_SERVER,
} from "@/store/actions.type"

export default Vue.extend({
  name: "WatchedServers",
  components: {
    AddServerDialog,
    DeleteServerDialog,
    ServerHistoryDialog,
    TableView,
    NoItems,
    Loading,
    Spinner,
  },
  data: () => ({
    refreshTimeout: -1,
    isNewServerDialogVisible: false,
    isDeleteServerDialogVisible: false,
    isServerHistoryDialogVisible: false,
  }),
  computed: {
    ...mapGetters([
      "servers",
      "serversCount",
      "isServersLoading",
      "serverSelected",
      "userProfile",
    ]),
  },
  destroyed() {
    clearInterval(this.refreshTimeout)
  },
  mounted() {
    this.getPrivateServers()
    this.refreshTimeout = window.setInterval(this.getPrivateServers, 120000)
  },
  methods: {
    showAddServerDialog() {
      this.isNewServerDialogVisible = true
    },
    onAddServerDialog() {
      this.onCloseAddServerDialog()
      setTimeout(this.getPrivateServers, 2500)
    },
    onCloseAddServerDialog() {
      this.isNewServerDialogVisible = false
      this.$store.dispatch(SELECT_SERVER, null)
    },
    showServerHistoryDialog() {
      this.isServerHistoryDialogVisible = true
    },
    onCloseServerHistoryDialog() {
      this.isServerHistoryDialogVisible = false
      this.$store.dispatch(SELECT_SERVER, null)
    },
    showDeleteServerDialog() {
      this.isDeleteServerDialogVisible = true
    },
    onCloseDeleteServerDialog() {
      this.isDeleteServerDialogVisible = false
      this.$store.dispatch(SELECT_SERVER, null)
    },
    onDeleteServerDialog() {
      if (this.serverSelected === null) {
        return
      }
      this.$store
        .dispatch(DELETE_SERVER, this.serverSelected)
        .then(() => {
          this.$toast.success(
            this.$t("servers.toast.delete.success", {
              name: this.serverSelected.name,
            })
          )
          this.onCloseDeleteServerDialog()
        })
        .catch(err => {
          this.$toast.error(err.message)
        })
    },
    getPrivateServers() {
      this.$store.dispatch(FETCH_SERVERS).catch(err => {
        this.$toast.error(err.message)
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.server-list {
  margin-bottom: 16px;
}
.view-toggle {
  margin-right: 0;
}
.view-toggle-icon {
  padding: 16px;
  margin-top: -12px;
}

@media only screen and (max-width: 585px) {
  #serverListRefreshButton {
    display: none;
  }
}
</style>
