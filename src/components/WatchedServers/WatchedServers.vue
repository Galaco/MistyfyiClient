<template>
    <div class="server-list">
        <md-card class="md-elevation-6">
            <md-table>
                <md-table-toolbar>
                    <h1 class="md-title">{{ $t('servers.servers.title') }}</h1>
                    <div>
                        <md-icon class="view-toggle-icon">list</md-icon>
                        <md-switch v-model="displayAsCard" class="md-primary view-toggle"></md-switch>
                        <md-icon class="view-toggle-icon">view_module</md-icon>
                    </div>
                    <md-button class="md-primary" @click="showAddServerDialog">
                        <i class="material-icons btn-icon">note_add</i>
                        <span>{{ $t('servers.servers.buttons.add') }}</span>
                    </md-button>
                </md-table-toolbar>

                <ListView
                        v-show="displayAsCard === false"
                        @showHistory="showServerHistoryDialog"
                        @showDelete="showDeleteServerDialog"
                />
            </md-table>
            <CardView
                    v-show="displayAsCard === true"
                    @showHistory="showServerHistoryDialog"
                    @showDelete="showDeleteServerDialog"
            />
        </md-card>
        <AddServerDialog
                v-bind:show="isNewServerDialogVisible"
                @close="closeAddServerDialog"
                @confirm="closeAddServerDialog"
        />
        <DeleteServerDialog
                v-bind:show="isDeleteServerDialogVisible"
                @close="closeDeleteServerDialog"
                @confirm="deleteServer"
        />
        <ServerHistoryDialog
                v-bind:show="isServerHistoryDialogVisible"
                v-bind:server="serverSelected"
                @close="closeServerHistoryDialog"
        />
    </div>
</template>

<script>
    import AddServerDialog from './DIalogs/AddServer';
    import DeleteServerDialog from './DIalogs/DeleteServer';
    import ServerHistoryDialog from './DIalogs/History';
    import CardView from './CardView';
    import ListView from './TableView';
    import {DELETE_SERVER, FETCH_SERVERS, SELECT_SERVER} from "./../../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'ServerList',
        components: {
            AddServerDialog,
            DeleteServerDialog,
            ServerHistoryDialog,
            CardView,
            ListView,
        },
        data() {
            return {
                displayAsCard: true,
                isNewServerDialogVisible: false,
                isDeleteServerDialogVisible: false,
                isServerHistoryDialogVisible: false,
            };
        },
        methods: {
            getPrivateServers() {
                this.$store.dispatch(FETCH_SERVERS).catch((err) => {
                    this.$toasted.global.api_error({
                        message : err.response.data.message
                    });
                });
            },
            showAddServerDialog() {
                this.isNewServerDialogVisible = true;
            },
            closeAddServerDialog() {
                this.isNewServerDialogVisible = false;
                this.$store.dispatch(SELECT_SERVER, null);
            },
            showServerHistoryDialog() {
                this.isServerHistoryDialogVisible = true;
            },
            closeServerHistoryDialog() {
                this.isServerHistoryDialogVisible = false;
                this.$store.dispatch(SELECT_SERVER, null);
            },
            showDeleteServerDialog() {
                this.isDeleteServerDialogVisible = true;
            },
            closeDeleteServerDialog() {
                this.isDeleteServerDialogVisible = false;
                this.$store.dispatch(SELECT_SERVER, null);
            },
            deleteServer() {
                if (this.serverSelected === null) {
                    return;
                }
                this.$store.dispatch(DELETE_SERVER, this.serverSelected).then(() => {
                    this.$toasted.global.api_success({
                        message : `Successfully deleted server: ${this.serverSelected.name}`
                    });
                    this.closeDeleteServerDialog();
                    this.getPrivateServers();
                }).catch((err) => {
                    console.log(err);
                    this.$toasted.global.api_error({
                        message : err.response.data.message
                    });
                });
            },
        },
        mounted() {
            this.getPrivateServers();

            // Poll every 30 seconds to ensure server info is up to date
            setInterval(() => {
                this.getPrivateServers();
            }, 15000);
        },
        computed: {
            ...mapGetters(["servers", "serversCount", "serverSelected", "userProfile"]),
        }
    }
</script>

<style scoped>
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
