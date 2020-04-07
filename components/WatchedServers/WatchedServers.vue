<template>
  <div class="server-list">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ $t('servers.servers.title') }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn
          :disabled="serversCount === 0 || isServersLoading === true"
          @click="getPrivateServers"
        >
          <v-icon v-if="isServersLoading === false">
            mdi-refresh
          </v-icon>
          <v-progress-circular
            v-if="isServersLoading === true"
            :size="16"
            :width="2"
            color="purple"
            indeterminate
          />
        </v-btn>
        <v-btn @click="showAddServerDialog">
          <v-icon>mdi-note-add</v-icon>
          <span>{{ $t('servers.servers.buttons.add') }}</span>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <TableView
          v-if="displayAsTable === true"
          @showHistory="showServerHistoryDialog"
          @showDelete="showDeleteServerDialog"
        />
        <CardView
          v-if="displayAsTable === false"
          @showHistory="showServerHistoryDialog"
          @showDelete="showDeleteServerDialog"
        />
        <v-row
          v-if="serversCount === 0"
          justify="center"
          align="center"
        >
          <v-col cols="12" align="center">
            <v-icon x-large>
              mdi-important-devices
            </v-icon>
            <h1>{{ $t('servers.servers.noItems.title') }}</h1>
            <div>{{ $t('servers.servers.noItems.description') }}</div>
            <v-btn id="addFirstServerButton" @click="showAddServerDialog">
              <v-icon>
                mdi-note-add
              </v-icon>
              <span>{{ $t('servers.servers.noItems.add') }}</span>
            </v-btn>
          </v-col>
        </v-row>
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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import AddServerDialog from './Dialogs/AddServer.vue'
import DeleteServerDialog from './Dialogs/DeleteServer.vue'
import ServerHistoryDialog from './Dialogs/History.vue'
import CardView from './CardView.vue'
import TableView from './TableView.vue'
import { DELETE_SERVER, FETCH_SERVERS, SELECT_SERVER } from '@/store/actions.type'

export default Vue.extend({
  name: 'ServerList',
  components: {
    AddServerDialog,
    DeleteServerDialog,
    ServerHistoryDialog,
    CardView,
    TableView
  },
  data: () => ({
    displayAsTable: true,
    isNewServerDialogVisible: false,
    isDeleteServerDialogVisible: false,
    isServerHistoryDialogVisible: false,
    pollInterval: -1
  }),
  computed: {
    ...mapGetters(['servers', 'serversCount', 'isServersLoading', 'serverSelected', 'userProfile'])
  },
  mounted () {
    this.getPrivateServers()

    this.pollInterval = setInterval(this.getPrivateServers, 30000)
  },
  destroyed () {
    clearInterval(this.pollInterval)
  },
  methods: {
    showAddServerDialog () {
      this.isNewServerDialogVisible = true
    },
    onAddServerDialog () {
      setTimeout(() => this.getPrivateServers(), 2500)
    },
    onCloseAddServerDialog () {
      this.isNewServerDialogVisible = false
      this.$store.dispatch(SELECT_SERVER, null)
    },
    showServerHistoryDialog () {
      this.isServerHistoryDialogVisible = true
    },
    onCloseServerHistoryDialog () {
      this.isServerHistoryDialogVisible = false
      this.$store.dispatch(SELECT_SERVER, null)
    },
    showDeleteServerDialog () {
      this.isDeleteServerDialogVisible = true
    },
    onCloseDeleteServerDialog () {
      this.isDeleteServerDialogVisible = false
      this.$store.dispatch(SELECT_SERVER, null)
    },
    onDeleteServerDialog () {
      if (this.serverSelected === null) {
        return
      }
      this.$store.dispatch(DELETE_SERVER, this.serverSelected).then(() => {
        this.$toast.success(this.$t('servers.servers.toast.delete.success', { name: this.serverSelected.name }))
        this.onCloseDeleteServerDialog()
      }).catch((err) => {
        this.$toast.error(err.message)
      })
    },
    getPrivateServers () {
      this.$store.dispatch(FETCH_SERVERS).catch((err) => {
        this.$toast.error(err.message)
      })
    }
  }
})
</script>

<style lang='scss' scoped>
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
</style>
