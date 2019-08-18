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
            <div class="row">
                <div class="col-md-3" v-for="(server,index) in servers" :key="index">
                    <div class="server card">
                        <img class="card-img-top" src="#" alt="#">
                        <div class="card-body">
                            <h5 class="card-title">{{ server.name }}</h5>
                            <p class="card-subtitle mb-2 text-muted">{{ server.ip_address }}:{{ server.port}}</p>
                            <p class="card-text">{{ server.current_map }}</p>
                            <button type="button" class="btn btn-danger" @click="showDeleteServerModal(server)">
                                <i class="material-icons btn-icon">delete</i>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UserLevels/>
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
    </div>
</template>

<script>
    import AddServerModal from './AddServerModal';
    import DeleteServerModal from './DeleteServerModal';
    import UserLevels from './UserLevels/UserLevels';
    import {DELETE_SERVER, FETCH_SERVERS} from "./../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'Servers',
        components: {
            AddServerModal,
            DeleteServerModal,
            UserLevels,
        },
        data() {
            return {
                selectedServer: null,
                isNewServerModalVisible: false,
                isDeleteServerModalVisible: false,
            };
        },
        methods: {
            getPrivateServers() {
                this.$store.dispatch(FETCH_SERVERS).catch((data) => {
                    this.$toasted.show(`An error occurred: ${data.message}`, {
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
            showDeleteServerModal(server) {
                this.selectedServer = server;
                this.isDeleteServerModalVisible = true;
            },
            closeDeleteServerModal() {
                this.isDeleteServerModalVisible = false;
            },
            deleteServer() {
                if (this.selectedServer === null) {
                    return;
                }
                this.$store.dispatch(DELETE_SERVER, this.selectedServer).then(() => {
                    this.closeDeleteServerModal();
                    this.getPrivateServers();
                }).catch((data) => {
                    this.$toasted.show(`An error occurred: ${data.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
                    });
                });
            }
        },
        mounted() {
            this.getPrivateServers();

            // Poll every 30 seconds to ensure server info is up to date
            setInterval(function() {
                this.getPrivateServers();
            }.bind(this), 15000);
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
    .server.card {
        padding: 0;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    }
    .server.card img {
        background-color: #DDD;
        width: 100%;
        height: 180px;
    }
    .server .card-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .server .card-text {
        height: 2.4rem;
    }
    .table-row-placeholder {
        text-align: center;
        padding: 15px 0;
    }
</style>
