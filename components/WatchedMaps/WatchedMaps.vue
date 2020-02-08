<template>
  <div class="map-list">
    <v-card>
      <v-card-title>
        <h1>
          {{ $t('servers.mapNames.title') }}
        </h1>
        <v-btn id="addMapNameButton" @click="showAddDialog()">
          <v-icon>mdi-note-add</v-icon>
          <span>{{ $t('servers.mapNames.buttons.add') }}</span>
        </v-btn>
      </v-card-title>
      <v-simple-table>
        <thead>
          <tr v-if="levelNames.length > 0">
            <th class="v-center">
              {{ $t('servers.mapNames.table.headers.name') }}
            </th>
            <th class="v-center">
              {{ $t('servers.mapNames.table.headers.server') }}
            </th>
            <th class="controls">
              {{ $t('table.headers.actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(map,index) in levelNames" :key="index">
            <td class="v-center">
              {{ map.name }}
            </td>
            <td class="v-center">
              {{ serverNameForId(map.server_id) }}
            </td>
            <td class="controls">
              <div class="md-layout md-alignment-center md-gutter">
                <div class="md-layout-item md-size-40">
                  <v-btn class="md-icon-button md-accent md-raised" @click="showDeleteDialog(map)">
                    <v-icon>mdi-delete</v-icon>
                    <md-tooltip md-direction="bottom">
                      {{ $t('servers.mapNames.buttons.delete') }}
                    </md-tooltip>
                  </v-btn>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>

      <md-empty-state
        v-if="levelNamesCount === 0"
        md-icon="create"
        :md-label="$t('servers.mapNames.noItems.title')"
        :md-description="$t('servers.mapNames.noItems.description')"
      >
        <v-btn id="addFirstMapNameButton" class="md-primary md-raised" @click="showAddDialog()">
          <i class="material-icons btn-icon">note_add</i>
          <span>{{ $t('servers.mapNames.noItems.add') }}</span>
        </v-btn>
      </md-empty-state>
      <div v-if="levelNamesCount === -1" class="row text-center">
        <div class="loading-spinner">
          <MoonLoader />
        </div>
      </div>
    </v-card>
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
import Vue from 'vue'
import { mapGetters } from 'vuex'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
import DeleteUserLevelDialog from './Dialogs/DeleteWatchedMap.vue'
import AddUserLevelDialog from './Dialogs/AddWatchedMap.vue'
import { FETCH_LEVEL_NAMES } from '@/store/actions.type'

export default Vue.extend({
  name: 'UserLevels',
  components: {
    DeleteUserLevelDialog,
    AddUserLevelDialog,
    MoonLoader
  },
  data () {
    return {
      isAddDialogVisible: false,
      selectedLevel: { name: '' },
      isDeleteDialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['servers', 'levelNames', 'levelNamesCount'])
  },
  mounted () {
    this.getUserLevels()
  },
  methods: {
    getUserLevels () {
      this.$store.dispatch(FETCH_LEVEL_NAMES)
    },
    showAddDialog () {
      this.isAddDialogVisible = true
    },
    closeAddDialog () {
      this.isAddDialogVisible = false
    },
    showDeleteDialog (map: any) {
      this.selectedLevel = map
      this.isDeleteDialogVisible = true
    },
    closeDeleteDialog () {
      this.isDeleteDialogVisible = false
      this.selectedLevel = { name: '' }
    },
    onMapAdded () {
      this.closeAddDialog()
      this.getUserLevels()
    },
    onMapDeleted () {
      this.closeDeleteDialog()
      this.getUserLevels()
    },
    serverNameForId (serverId: number): string {
      if (serverId < 1) {
        return this.$t('servers.mapNames.table.body.servers.all')
      }
      for (const server of this.servers) {
        if (server.id === serverId) {
          return (server.name || `${server.ip_address}:${server.port}`)
        }
      }
      return ''
    }
  }
})

</script>

<style lang='scss' scoped>
    .md-table-toolbar {
        border-bottom: 1px solid #bbb;
    }

    .map-list {
        margin-bottom: 16px;
    }

    th.controls {
        text-align: center;
        width: 160px;
        min-width: 160px;
    }

    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
