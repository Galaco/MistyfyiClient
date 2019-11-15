<template>
    <div class="server-list">
        <md-card class="md-elevation-6">
            <md-table>
                <md-table-toolbar>
                    <h1 class="md-title">{{ $t('servers.servers.title') }}</h1>
                    <div>
                        <md-icon class="view-toggle-icon">list</md-icon>
                        <md-switch v-model="displayAsCard" class="md-primary view-toggle"></md-switch>
                        <md-icon class="view-toggle-icon">view_column</md-icon>
                    </div>
                    <md-button class="md-primary md-raised" @click="showAddServerDialog">
                        <i class="material-icons btn-icon">note_add</i>
                        <span>{{ $t('servers.servers.buttons.add') }}</span>
                    </md-button>
                </md-table-toolbar>

                <ListView
                        v-if="displayAsCard === false"
                        @showHistory="showServerHistoryDialog"
                        @showDelete="showDeleteServerDialog"
                />
            </md-table>
            <CardView
                    v-if="displayAsCard === true"
                    @showHistory="showServerHistoryDialog"
                    @showDelete="showDeleteServerDialog"
            />
            <md-empty-state
                    v-if="serversCount === 0"
                    md-icon="important_devices"
                    :md-label="$t('servers.servers.noItems.title')"
                    :md-description="$t('servers.servers.noItems.description')">
                <md-button class="md-primary md-raised" @click="showAddServerDialog">
                    <i class="material-icons btn-icon">note_add</i>
                    <span>{{ $t('servers.servers.noItems.add') }}</span>
                </md-button>
            </md-empty-state>
        </md-card>
        <AddServerDialog
                v-bind:show="isNewServerDialogVisible"
                @deny="onCloseAddServerDialog"
                @confirm="onAddServerDialog"
        />
        <DeleteServerDialog
                v-bind:show="isDeleteServerDialogVisible"
                @deny="onCloseDeleteServerDialog"
                @confirm="onDeleteServerDialog"
        />
        <ServerHistoryDialog
                v-bind:show="isServerHistoryDialogVisible"
                v-bind:server="serverSelected"
                @deny="onCloseServerHistoryDialog"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import AddServerDialog from './Dialogs/AddServer.vue';
import DeleteServerDialog from './Dialogs/DeleteServer.vue';
import ServerHistoryDialog from './Dialogs/History.vue';
import CardView from './CardView.vue';
import ListView from './TableView.vue';
import {DELETE_SERVER, FETCH_SERVERS, SELECT_SERVER} from '@/store/actions.type';

export default Vue.extend({
    name: 'ServerList',
    components: {
        AddServerDialog,
        DeleteServerDialog,
        ServerHistoryDialog,
        CardView,
        ListView,
    },
    data: () => ({
        displayAsCard: false,
        isNewServerDialogVisible: false,
        isDeleteServerDialogVisible: false,
        isServerHistoryDialogVisible: false,
        pollInterval: -1,
    }),
    methods: {
        showAddServerDialog() {
            this.isNewServerDialogVisible = true;
        },
        onAddServerDialog() {
            setTimeout(() => this.getPrivateServers(), 2500);
        },
        onCloseAddServerDialog() {
            this.isNewServerDialogVisible = false;
            this.$store.dispatch(SELECT_SERVER, null);
        },
        showServerHistoryDialog() {
            this.isServerHistoryDialogVisible = true;
        },
        onCloseServerHistoryDialog() {
            this.isServerHistoryDialogVisible = false;
            this.$store.dispatch(SELECT_SERVER, null);
        },
        showDeleteServerDialog() {
            this.isDeleteServerDialogVisible = true;
        },
        onCloseDeleteServerDialog() {
            this.isDeleteServerDialogVisible = false;
            this.$store.dispatch(SELECT_SERVER, null);
        },
        onDeleteServerDialog() {
            if (this.serverSelected === null) {
                return;
            }
            this.$store.dispatch(DELETE_SERVER, this.serverSelected).then(() => {
                this.$toasted.global.api_success({
                    message: this.$t('servers.servers.toast.delete.success', {name: this.serverSelected.name}),
                });
                this.closeDeleteServerDialog();
            }).catch((err) => {
                this.$toasted.global.api_error({ message : err.message });
            });
        },
        getPrivateServers() {
            this.$store.dispatch(FETCH_SERVERS).catch((err) => {
                this.$toasted.global.api_error({ message : err.message });
            });
        },
    },
    mounted() {
        this.getPrivateServers();
        // Poll every 30 seconds to ensure server info is up to date
        this.pollInterval = setInterval(() => {
            this.getPrivateServers();
        }, 15000);
    },
    destroyed() {
        clearInterval(this.pollInterval);
    },
    computed: {
        ...mapGetters(['servers', 'serversCount', 'serverSelected', 'userProfile']),
    },
});
</script>

<style lang="scss" scoped>
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
