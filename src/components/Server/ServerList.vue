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
                    <md-button class="md-primary" @click="showAddServerModal">
                        <i class="material-icons btn-icon">note_add</i>
                        <span>{{ $t('servers.servers.buttons.add') }}</span>
                    </md-button>
                </md-table-toolbar>

                <ListView
                        v-show="displayAsCard === false"
                        @showHistory="showServerHistoryModal"
                        @showDelete="showDeleteServerModal"
                />
            </md-table>
            <CardView
                    v-show="displayAsCard === true"
                    @showHistory="showServerHistoryModal"
                    @showDelete="showDeleteServerModal"
            />
        </md-card>
        <AddServerModal
                v-bind:show="isNewServerModalVisible"
                @close="closeAddServerModal"
                @confirm="closeAddServerModal"
        />
        <DeleteServerModal
                v-bind:show="isDeleteServerModalVisible"
                @close="closeDeleteServerModal"
                @confirm="deleteServer"
        />
        <ServerHistoryModal
                v-bind:show="isServerHistoryModalVisible"
                v-bind:server="serverSelected"
                @close="closeServerHistoryModal"
        />
    </div>
</template>

<script>
    import AddServerModal from './Modals/AddServerModal';
    import DeleteServerModal from './Modals/DeleteServerModal';
    import ServerHistoryModal from './Modals/HistoryModal';
    import CardView from './CardView';
    import ListView from './ListView';
    import {DELETE_SERVER, FETCH_SERVERS, SELECT_SERVER} from "./../../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'ServerList',
        components: {
            AddServerModal,
            DeleteServerModal,
            ServerHistoryModal,
            CardView,
            ListView,
        },
        data() {
            return {
                displayAsCard: true,
                isNewServerModalVisible: false,
                isDeleteServerModalVisible: false,
                isServerHistoryModalVisible: false,
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
            showAddServerModal() {
                this.isNewServerModalVisible = true;
            },
            closeAddServerModal() {
                this.isNewServerModalVisible = false;
                this.$store.dispatch(SELECT_SERVER, null);
            },
            showServerHistoryModal() {
                this.isServerHistoryModalVisible = true;
            },
            closeServerHistoryModal() {
                this.isServerHistoryModalVisible = false;
                this.$store.dispatch(SELECT_SERVER, null);
            },
            showDeleteServerModal() {
                this.isDeleteServerModalVisible = true;
            },
            closeDeleteServerModal() {
                this.isDeleteServerModalVisible = false;
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
                    this.closeDeleteServerModal();
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
