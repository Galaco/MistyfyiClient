<template>
    <div>
        <div class="container server-list">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col" class="v-center">Watched Servers</th>
                            <th scope="col" class="controls">
                                <button
                                        type="button"
                                        class="btn btn-primary"
                                        @click="showAddServerModal"
                                >
                                    <i class="material-icons btn-icon">note_add</i>
                                    <span>Add Server</span>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row" v-if="serversCount === 0">
                <div class="col-sm-12 table-row-placeholder">You have not added any servers yet.</div>
            </div>
            <div class="row text-center" v-if="serversCount === -1">
                <div class="col-sm-12 loading-spinner">
                    <MoonLoader/>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3" v-for="(server,index) in servers" :key="index">
                    <Server :server="server"
                            @delete="showDeleteServerModal"
                            @history="showServerHistoryModal"
                    />
                </div>
            </div>
        </div>
        <AddServerModal
                v-show="isNewServerModalVisible"
                @close="closeAddServerModal"
                @confirm="closeAddServerModal"
        />
        <DeleteServerModal
                v-show="isDeleteServerModalVisible"
                @close="closeDeleteServerModal"
                @confirm="deleteServer"
        />
        <ServerHistoryModal
                v-show="isServerHistoryModalVisible"
                v-bind:server="selectedServer"
                @close="closeServerHistoryModal"
        />
    </div>
</template>

<script>
    import AddServerModal from './AddServerModal';
    import DeleteServerModal from './DeleteServerModal';
    import ServerHistoryModal from './HistoryModal';
    import Server from './Server';
    import {DELETE_SERVER, FETCH_SERVERS} from "./../../store/actions.type";
    import { mapGetters } from "vuex";
    import MoonLoader from 'vue-spinner/src/MoonLoader.vue';

    export default {
        name: 'ServerList',
        components: {
            AddServerModal,
            DeleteServerModal,
            ServerHistoryModal,
            MoonLoader,
            Server,
        },
        data() {
            return {
                selectedServer: null,
                isNewServerModalVisible: false,
                isDeleteServerModalVisible: false,
                isServerHistoryModalVisible: false,
                isEnableNotificationModalVisible: false,
            };
        },
        methods: {
            getPrivateServers() {
                this.$store.dispatch(FETCH_SERVERS).catch((err) => {
                    this.$toasted.show(`An error occurred: ${err.response.data.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
                    });
                });
            },
            showAddServerModal() {
                this.isNewServerModalVisible = true;
            },
            closeAddServerModal() {
                this.isNewServerModalVisible = false;
                this.selectedServer = null;
            },
            showServerHistoryModal(server) {
                this.selectedServer = server;
                this.isServerHistoryModalVisible = true;
            },
            closeServerHistoryModal() {
                this.isServerHistoryModalVisible = false;
                this.selectedServer = null;
            },
            showDeleteServerModal(server) {
                this.selectedServer = server;
                this.isDeleteServerModalVisible = true;
            },
            closeDeleteServerModal() {
                this.isDeleteServerModalVisible = false;
                this.selectedServer = null;
            },
            deleteServer() {
                if (this.selectedServer === null) {
                    return;
                }
                this.$store.dispatch(DELETE_SERVER, this.selectedServer).then(() => {
                    this.closeDeleteServerModal();
                    this.getPrivateServers();
                }).catch((err) => {
                    this.$toasted.show(`An error occurred: ${err.response.data.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
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
            ...mapGetters(["servers", "serversCount"]),
        }
    }
</script>

<style scoped>
    th.v-center, td.v-center {
        vertical-align: middle;
    }

    td.controls, th.controls {
        text-align: right;
    }
    .container.server-list {
        margin-bottom: 15px;
    }
    .table-row-placeholder {
        text-align: center;
        padding: 15px 0;
    }

    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
