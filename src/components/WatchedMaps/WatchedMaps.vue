<template>
  <div class="map-list">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ $t("notifications.title") }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn id="addMapNameButton" @click="showAddDialog">
          <v-icon>mdi-note-add</v-icon>
          <span>{{ $t("notifications.buttons.add") }}</span>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-simple-table v-if="levelNamesCount > 0">
          <thead>
            <tr>
              <th class="v-center">
                {{ $t("notifications.table.headers.name") }}
              </th>
              <th class="v-center">
                {{ $t("notifications.table.headers.server") }}
              </th>
              <th class="v-center">
                {{ $t("notifications.table.headers.enabled") }}
              </th>
              <th class="controls">
                {{ $t("table.headers.actions") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <MapRow
              v-for="(map, index) in levelNames"
              :key="index"
              :model="map"
              :get-server-name-from-id="serverNameForId"
              :on-delete="showDeleteDialog"
            />
          </tbody>
        </v-simple-table>
        <NoItems
          v-if="levelNamesCount === 0"
          :title="$t('notifications.noItems.title')"
          :description="$t('notifications.noItems.description')"
          button-id="addFirstMapNameButton"
          :button-on-click="showAddDialog"
          :button-text="$t('notifications.noItems.add')"
        />
        <Loading v-if="levelNamesCount === -1" />
      </v-card-text>
    </v-card>
    <v-btn
      key="share"
      color="success"
      fab
      large
      dark
      bottom
      right
      fixed
      class="v-btn--mobile-add"
      @click="showAddDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <AddUserLevelDialog
      :show="isAddDialogVisible"
      @deny="closeAddDialog"
      @confirm="onMapAdded"
    />
    <DeleteUserLevelDialog
      :show="isDeleteDialogVisible"
      :model="selectedLevel"
      @deny="closeDeleteDialog"
      @confirm="onMapDeleted"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import DeleteUserLevelDialog from "./Dialogs/DeleteWatchedMap.vue"
import AddUserLevelDialog from "./Dialogs/AddWatchedMap.vue"
import MapRow from "./MapRow.vue"
import WatchedMap from "@/models/api/maps/WatchedMap"
import { FETCH_LEVEL_NAMES } from "@/store/actions.type"
import NoItems from "@/components/Common/Table/NoItems.vue"
import Loading from "@/components/Common/Table/Loading.vue"

export default Vue.extend({
  name: "WatchedMaps",
  components: {
    DeleteUserLevelDialog,
    AddUserLevelDialog,
    MapRow,
    NoItems,
    Loading,
  },
  data() {
    return {
      isAddDialogVisible: false,
      selectedLevel: new WatchedMap("", ""),
      isDeleteDialogVisible: false,
    }
  },
  computed: {
    ...mapGetters(["servers", "levelNames", "levelNamesCount"]),
  },
  mounted() {
    this.getUserLevels()
  },
  methods: {
    getUserLevels() {
      this.$store.dispatch(FETCH_LEVEL_NAMES)
    },
    showAddDialog() {
      this.isAddDialogVisible = true
    },
    closeAddDialog() {
      this.isAddDialogVisible = false
    },
    showDeleteDialog(map: WatchedMap) {
      this.selectedLevel = map
      this.isDeleteDialogVisible = true
    },
    closeDeleteDialog() {
      this.isDeleteDialogVisible = false
      this.selectedLevel = new WatchedMap("", "")
    },
    onMapAdded() {
      this.closeAddDialog()
      this.getUserLevels()
    },
    onMapDeleted() {
      this.closeDeleteDialog()
      this.getUserLevels()
    },
    serverNameForId(serverId: string): string {
      if (serverId === "") {
        return String(this.$t("notifications.table.body.servers.all"))
      }
      for (const server of this.servers) {
        if (server.id === serverId) {
          return server.name || `${server.ipAddress}:${server.port}`
        }
      }
      return ""
    },
  },
})
</script>

<style lang="scss" scoped>
th.controls {
  text-align: center;
  width: 160px;
  min-width: 160px;
}

.v-btn--mobile-add {
  display: none;
}

@media only screen and (max-width: 585px) {
  .v-toolbar {
    display: none;
  }

  .v-btn--mobile-add {
    display: block;
  }

  thead tr {
    display: none;
  }
}
</style>
