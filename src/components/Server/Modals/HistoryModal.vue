<template>
    <md-dialog :md-active.sync="show" id="serverHistoryModal">
        <md-dialog-title>{{ $t('servers.servers.modals.history.title') }}</md-dialog-title>
        <md-content>
            <md-table class="vh60">
                <md-table-row>
                    <md-table-head>{{ $t('servers.servers.modals.history.body.headers.date') }}</md-table-head>
                    <md-table-head>{{ $t('servers.servers.modals.history.body.headers.mapName') }}</md-table-head>
                </md-table-row>
                <md-table-row v-for="(server,index) in history" :key="index">
                    <md-table-cell>{{ server.date_created }}</md-table-cell>
                    <md-table-cell>{{ server.map_name }}</md-table-cell>
                </md-table-row>
            </md-table>
        </md-content>
        <md-dialog-actions>
            <md-button class="md-secondary" @click="close">{{ $t('modal.buttons.close') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    import {FETCH_SERVER_HISTORY} from "../../../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'modal',
        props: {
            show: Boolean,
            server: Object,
        },
        methods: {
            fetchHistory(id) {
                this.$store.dispatch(FETCH_SERVER_HISTORY, id).catch((err) => {
                    this.$toasted.global.api_error({
                        message : err.response.data.message
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
    .vh60 {
        max-height: 60vh;
    }
</style>
