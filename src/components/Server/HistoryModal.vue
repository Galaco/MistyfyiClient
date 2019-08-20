<template>
    <transition name="modal-fade">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <header class="modal-header" id="addServerModalTitle">
                            <slot name="header">
                                <h5 class="modal-title">Server History</h5>
                                <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                            </slot>
                        </header>
                        <section class="modal-body" id="modalDescription">
                            <slot name="body">
                                <table class="table table-striped">
                                    <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Changed</th>
                                        <th scope="col">Map Name</th>
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
                                    <span>Close</span>
                                </button>
                            </slot>
                        </footer>
                    </div>
                </div>
            </div>
    </transition>
</template>

<script>
    import {FETCH_SERVER_HISTORY} from "../../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'modal',
        props: {
            "server": Object,
        },
        methods: {
            fetchHistory(id) {
                this.$store.dispatch(FETCH_SERVER_HISTORY, id).catch((data) => {
                    this.$toasted.show(`An error occurred: ${data.message}`, {
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

<style>
    .modal {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
    }

    .modal-title {
        line-height: 2rem;
    }
</style>
