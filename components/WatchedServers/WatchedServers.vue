<template>
  <div class="server-list">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ $t('servers.servers.title') }}
        </v-toolbar-title>
        <v-spacer />
        <div>
          <v-switch
            v-model="displayAsTable"
            :label="$t('servers.servers.buttons.tableView')"
          />
        </div>
        <v-spacer />
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
        <md-empty-state
          v-if="serversCount === 0"
          md-icon="important_devices"
          :md-label="$t('servers.servers.noItems.title')"
          :md-description="$t('servers.servers.noItems.description')"
        >
          <v-btn class="md-primary md-raised" @click="showAddServerDialog">
            <v-icon>mdi-note-add</v-icon>
            <span>{{ $t('servers.servers.noItems.add') }}</span>
          </v-btn>
        </md-empty-state>
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
    ...mapGetters(['servers', 'serversCount', 'serverSelected', 'userProfile'])
  },
  mounted () {
    this.getPrivateServers()
    // Poll every 30 seconds to ensure server info is up to date
    this.pollInterval = setInterval(() => {
      this.getPrivateServers()
    }, 15000)
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
        this.$toasted.global.api_success({
          message: this.$t('servers.servers.toast.delete.success', { name: this.serverSelected.name })
        })
        this.onCloseDeleteServerDialog()
      }).catch((err) => {
        this.$toasted.global.api_error({ message: err.message })
      })
    },
    getPrivateServers () {
      this.$store.dispatch(FETCH_SERVERS).catch((err) => {
        this.$toasted.global.api_error({ message: err.message })
      })
    }
  }
})
</script>

<style lang='scss' scoped>
    .md-table-toolbar {
        border-bottom: 1px solid #bbb;
    }
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
