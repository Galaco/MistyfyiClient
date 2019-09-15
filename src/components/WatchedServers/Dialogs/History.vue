<template>
    <Info
        id="serverHistoryDialog"
        :title="$t('servers.servers.dialogs.history.title')"
        @deny="close"
        :show="show"
        :confirmDisabled="false"
        >
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
    </Info>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Info from '@/components/Dialogs/Info.vue';
import {FETCH_SERVER_HISTORY} from '@/store/actions.type';

export default Vue.extend({
    name: 'History',
    components: {
        Info,
    },
    props: {
        show: Boolean,
        server: Object,
    },
    methods: {
        fetchHistory(id: any) {
            this.$store.dispatch(FETCH_SERVER_HISTORY, id).catch((err) => {
                this.$toasted.global.api_error({ message : err.message });
            });
        },
        close() {
            this.$emit('deny');
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
