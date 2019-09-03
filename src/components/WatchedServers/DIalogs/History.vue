<template>
    <md-dialog :md-active.sync="show" id="serverHistoryDialog" :md-click-outside-to-close="false">
        <md-dialog-title>{{ $t('servers.servers.dialogs.history.title') }}</md-dialog-title>
        <md-dialog-content>
            <md-table class="vh60">
                <md-table-row>
                    <md-table-head>{{ $t('servers.servers.dialogs.history.body.headers.date') }}</md-table-head>
                    <md-table-head>{{ $t('servers.servers.dialogs.history.body.headers.mapName') }}</md-table-head>
                </md-table-row>
                <md-table-row v-for="(server,index) in history" :key="index">
                    <md-table-cell>{{ server.date_created }}</md-table-cell>
                    <md-table-cell>{{ server.map_name }}</md-table-cell>
                </md-table-row>
            </md-table>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-secondary" @click="close">{{ $t('dialog.buttons.close') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import {FETCH_SERVER_HISTORY} from './../../../store/actions.type';

export default Vue.extend({
    name: 'History',
    props: {
        show: Boolean,
        server: Object,
    },
    methods: {
        fetchHistory(id: any) {
            this.$store.dispatch(FETCH_SERVER_HISTORY, id).catch((err) => {
                this.$toasted.global.api_error({
                    message : err.response.data.message,
                });
            });
        },
        close() {
            this.$emit('close');
        },
    },
    watch: {
        server(newValue: any) {
            if (newValue == null) {
                return;
            }
            this.fetchHistory(newValue.id);
        },
    },
    computed: {
        ...mapGetters(['history', 'historyCount']),
    },
});
</script>

<style lang="scss" scoped>
    .vh60 {
        max-height: 60vh;
    }
</style>
