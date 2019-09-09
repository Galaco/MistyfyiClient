<template>
    <div class="list-view">
        <md-table>
            <md-table-row  v-if="servers.length > 0">
                <md-table-head>{{ $t('servers.servers.list.headers.server') }}</md-table-head>
                <md-table-head>{{ $t('servers.servers.list.headers.address') }}</md-table-head>
                <md-table-head>{{ $t('servers.servers.list.headers.map') }}</md-table-head>
                <md-table-head>{{ $t('servers.servers.list.headers.updated') }}</md-table-head>
                <md-table-head class="controls">{{ $t('table.headers.actions') }}</md-table-head>
            </md-table-row>
            <Row v-for="(server,index) in servers" :key="index"
                 :server="server"
                 @delete="showDelete"
                 @history="showHistory"
            />
        </md-table>
        <div class="row text-center" v-if="serversCount === -1">
            <div class="col-sm-12 loading-spinner">
                <MoonLoader/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
import Row from './TableRow.vue';
import {SELECT_SERVER} from '@/store/actions.type';

export default Vue.extend({
    name: 'CardView',
    components: {
        MoonLoader,
        Row,
    },
    methods: {
        showHistory(server: any) {
            this.$store.dispatch(SELECT_SERVER, server);
            this.$emit('showHistory');
        },
        showDelete(server: any) {
            this.$store.dispatch(SELECT_SERVER, server);
            this.$emit('showDelete');
        },
    },
    computed: {
        ...mapGetters(['servers', 'serversCount', 'serverSelected']),
    },
});
</script>

<style lang="scss" scoped>
    .list-view {
        th.controls {
            text-align: center;
            width: 160px;
            min-width: 160px;
        }
    }

    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
