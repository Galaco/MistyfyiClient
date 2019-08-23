<template>
    <div>
        <div class="container server-list">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col" class="v-center">{{ $t('servers.servers.title') }}</th>
                            <th scope="col" class="controls">
                                <div class="btn-group btn-group-toggle view-toggle">
                                    <label class="btn btn-secondary" id="server-view-select-card" v-bind:class="{ active: displayVariant === 'card' }">
                                        <input type="radio" name="server-view" autocomplete="off" checked @click="setViewMode('card')">
                                        <i class="material-icons btn-icon">view_module</i>
                                    </label>
                                    <label class="btn btn-secondary" id="server-view-select-list" v-bind:class="{ active: displayVariant === 'list' }">
                                        <input type="radio" name="server-view" autocomplete="off" @click="setViewMode('list')">
                                        <i class="material-icons btn-icon">list</i>
                                    </label>
                                </div>
                                <button
                                        type="button"
                                        class="btn btn-primary"
                                        @click="showAddServerModal"
                                >
                                    <i class="material-icons btn-icon">note_add</i>
                                    <span>{{ $t('servers.servers.buttons.add') }}</span>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <CardView
                v-show="displayVariant === 'card'"
                @showHistory="showServerHistoryModal"
                @showDelete="showDeleteServerModal"
        />
        <ListView
                v-show="displayVariant === 'list'"
                @showHistory="showServerHistoryModal"
                @showDelete="showDeleteServerModal"
        />
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
                displayVariant: 'card',
                isNewServerModalVisible: false,
                isDeleteServerModalVisible: false,
                isServerHistoryModalVisible: false,
            };
        },
        methods: {
            setViewMode(variant) {
                this.displayVariant = variant;
            },
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
            ...mapGetters(["servers", "serversCount", "serverSelected"]),
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
    .view-toggle {
        margin: 0 8px;
    }
    #server-view-select-card, #server-view-select-list {
        cursor: pointer;
    }
</style>
