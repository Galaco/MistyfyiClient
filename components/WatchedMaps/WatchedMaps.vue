<template>
  <div class="map-list">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>
          {{ $t('servers.mapNames.title') }}
        </v-toolbar-title>
        <v-spacer />
        <v-btn id="addMapNameButton" @click="showAddDialog()">
          <v-icon>mdi-note-add</v-icon>
          <span>{{ $t('servers.mapNames.buttons.add') }}</span>
        </v-btn>
      </v-toolbar>
      <v-card-text>
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
              <td class="controls" align="center">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="pink"
                      v-on="on"
                      @click="showDeleteDialog(map)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t('servers.mapNames.buttons.delete') }}</span>
                </v-tooltip>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-row
          v-if="levelNamesCount === 0"
          justify="center"
          align="center"
        >
          <v-col cols="12" align="center">
            <h1>{{ $t('servers.mapNames.noItems.title') }}</h1>
            <div>{{ $t('servers.mapNames.noItems.description') }}</div>
            <v-btn id="addFirstMapNameButton" @click="showAddDialog()">
              <v-icon>
                mdi-file-plus
              </v-icon>
              <span>{{ $t('servers.mapNames.noItems.add') }}</span>
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="levelNamesCount === -1" class="row text-center">
          <div class="col-sm-12 loading-spinner">
            <v-progress-circular
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            />
          </div>
        </div>
      </v-card-text>
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
import DeleteUserLevelDialog from './Dialogs/DeleteWatchedMap.vue'
import AddUserLevelDialog from './Dialogs/AddWatchedMap.vue'
import { FETCH_LEVEL_NAMES } from '@/store/actions.type'

export default Vue.extend({
  name: 'UserLevels',
  components: {
    DeleteUserLevelDialog,
    AddUserLevelDialog
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
        return String(this.$t('servers.mapNames.table.body.servers.all'))
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
