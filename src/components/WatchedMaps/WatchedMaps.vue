<template>
    <div class="map-list">
        <md-card class="md-elevation-6">
            <md-table>
                <md-table-toolbar>
                    <h1 class="md-title">{{ $t('servers.mapNames.title') }}</h1>
                    <md-button class="md-primary md-raised" @click="showAddDialog()" id="addMapNameButton">
                        <i class="material-icons btn-icon">note_add</i>
                        <span>{{ $t('servers.mapNames.buttons.add') }}</span>
                    </md-button>
                </md-table-toolbar>
                <md-table-row v-if="levelNames.length > 0">
                    <md-table-head class="v-center">{{ $t('servers.mapNames.table.headers.name') }}</md-table-head>
                    <md-table-head class="controls">{{ $t('table.headers.actions') }}</md-table-head>
                </md-table-row>
                <md-table-row v-for="(map,index) in levelNames" :key="index">
                    <md-table-cell class="v-center">{{ map.name }}</md-table-cell>
                    <md-table-cell class="controls">
                        <div class="md-layout md-alignment-center md-gutter">
                            <div class="md-layout-item md-size-40">
                                <md-button class="md-icon-button md-accent md-raised" @click="showDeleteDialog(map)">
                                    <md-icon>delete</md-icon>
                                    <md-tooltip md-direction="bottom">{{ $t('servers.mapNames.buttons.delete') }}</md-tooltip>
                                </md-button>
                            </div>
                        </div>
                    </md-table-cell>
                </md-table-row>
            </md-table>

            <md-empty-state
                    v-if="levelNamesCount === 0"
                    md-icon="create"
                    :md-label="$t('servers.mapNames.noItems.title')"
                    :md-description="$t('servers.mapNames.noItems.description')">
                <md-button class="md-primary md-raised" @click="showAddDialog()" id="addFirstMapNameButton">
                    <i class="material-icons btn-icon">note_add</i>
                    <span>{{ $t('servers.mapNames.noItems.add') }}</span>
                </md-button>
            </md-empty-state>
            <div class="row text-center" v-if="levelNamesCount === -1">
                <div class="loading-spinner">
                    <MoonLoader/>
                </div>
            </div>
        </md-card>
        <AddUserLevelDialog
                v-bind:show="isAddDialogVisible"
                @deny="closeAddDialog"
                @confirm="onMapAdded"/>
        <DeleteUserLevelDialog
                v-bind:show="isDeleteDialogVisible"
                v-bind:model="selectedLevel"
                @deny="closeDeleteDialog"
                @confirm="onMapDeleted"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
import DeleteUserLevelDialog from './Dialogs/DeleteWatchedMap.vue';
import AddUserLevelDialog from './Dialogs/AddWatchedMap.vue';
import {FETCH_LEVEL_NAMES} from '@/store/actions.type';
import ApiResponse from '../../models/ApiResponse';
import { FETCH_LEVEL_NAMES_END } from '../../store/mutations.type';

export default Vue.extend({
    name: 'UserLevels',
    components: {
        DeleteUserLevelDialog,
        AddUserLevelDialog,
        MoonLoader,
    },
    methods: {
        getUserLevels() {
            this.$store.dispatch(FETCH_LEVEL_NAMES);
        },
        showAddDialog() {
            this.isAddDialogVisible = true;
        },
        closeAddDialog() {
            this.isAddDialogVisible = false;
        },
        showDeleteDialog(map: any) {
            this.selectedLevel = map;
            this.isDeleteDialogVisible = true;
        },
        closeDeleteDialog() {
            this.isDeleteDialogVisible = false;
            this.selectedLevel = {name: ''};
        },
        onMapAdded() {
            this.closeAddDialog();
            this.getUserLevels();
        },
        onMapDeleted() {
            this.closeDeleteDialog();
            this.getUserLevels();
        },
    },
    data() {
        return {
            isAddDialogVisible: false,
            selectedLevel: {name: ''},
            isDeleteDialogVisible: false,
        };
    },
    mounted() {
        this.getUserLevels();
    },
    computed: {
        ...mapGetters(['levelNames', 'levelNamesCount']),
    },
});

</script>

<style lang="scss" scoped>
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
