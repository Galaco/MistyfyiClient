<template>
    <transition name="modal-fade">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <header class="modal-header">
                            <slot name="header">
                                <h5 class="modal-title">{{ $t('servers.servers.modals.history.title') }}</h5>
                                <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                            </slot>
                        </header>
                        <section class="modal-body" id="modalDescription">
                            <slot name="body">
                                <table class="table table-striped">
                                    <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">{{ $t('servers.servers.modals.history.body.headers.date') }}</th>
                                        <th scope="col">{{ $t('servers.servers.modals.history.body.headers.mapName') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(server,index) in history" :key="index">
                                        <td>{{ server.date_created }}</td>
                                        <td>{{ server.map_name }}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </slot>
                        </section>
                        <footer class="modal-footer">
                            <slot name="footer">
                                <button type="button" class="btn btn-secondary" @click="close" aria-label="Close modal">
                                    <i class="material-icons btn-icon">cancel</i>
                                    <span>{{ $t('modal.buttons.close') }}</span>
                                </button>
                            </slot>
                        </footer>
                    </div>
                </div>
            </div>
    </transition>
</template>

<script>
    import {FETCH_SERVER_HISTORY} from "../../../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'modal',
        props: {
            "server": Object,
        },
        methods: {
            fetchHistory(id) {
                this.$store.dispatch(FETCH_SERVER_HISTORY, id).catch((err) => {
                    this.$toasted.show(`An error occurred: ${err.response.data.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
                    });
                });
            },
            close() {
                this.$emit('close');
            },
        },
        watch: {
            server: function(newValue) {
                if (newValue == null) {
                    return;
                }
                this.fetchHistory(newValue.id);
            },
        },
        computed: {
            ...mapGetters(["history", "historyCount"]),
        }
    };
</script>

<style scoped>
    .modal-body {
        max-height: 60vh;
        overflow-y: scroll;
    }
</style>
