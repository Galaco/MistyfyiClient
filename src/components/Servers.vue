<template>
    <div>
        <div class="container server-list">
            <div class="row header">
                <div class="col-sm-12">
                    <h3>Watched Servers</h3>
                </div>
            </div>
            <div class="row" v-if="serversCount === 0">
                <div class="col-sm-12 table-row-placeholder">You have not added any servers yet.</div>
            </div>
            <div class="row">
                <div class="server card col-sm-4" v-for="(server,index) in servers" :key="index">
                    <img class="card-img-top" src="#" alt="#">
                    <div class="card-body">
                        <h5 class="card-title">{{ server.name }}</h5>
                        <p class="card-subtitle mb-2 text-muted">{{ server.ip_address }}:{{ server.port}}</p>
                        <p class="card-text">{{ server.current_map }}</p>
                        <button type="button" class="btn btn-danger" @click="deleteServer(server)">Delete</button>
                    </div>
                </div>
            </div>
            <div class="row controls">
                <div class="col-sm-12">
                    <button
                            type="button"
                            class="btn btn-primary"
                            @click="showAddServerModal"
                    >Add Server
                    </button>
                </div>
            </div>
        </div>
        <AddServerModal
                v-show="isModalVisible"
                @close="closeAddServerModal"
        />
    </div>
</template>

<script>
    import AddServerModal from './AddServerModal';
    import {DELETE_SERVER, FETCH_SERVERS} from "./../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'Servers',
        components: {
            AddServerModal
        },
        data() {
            return {
                isModalVisible: false,
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
                this.isModalVisible = true;
            },
            closeAddServerModal() {
                this.isModalVisible = false;
            },
            deleteServer(server) {
                this.$store.dispatch(DELETE_SERVER, server).then(() => {
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
    .server.card {
        padding: 0;
        margin: 0 15px;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    }
    .server.card img {
        background-color: #DDD;
        width: 100%;
        height: 180px;
    }
    .server-list .row {
        text-align: left;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: solid 1px #EFEFEF;
    }
    .table-row-placeholder {
        text-align: center;
        padding: 15px 0;
    }
</style>
