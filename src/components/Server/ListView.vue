<template>
    <div class="container list-view">
        <div class="row">
            <div class="col-sm-12">
                <md-table>
                    <md-table-row>
                        <md-table-head scope="col">{{ $t('servers.servers.list.headers.server') }}</md-table-head>
                        <md-table-head scope="col">{{ $t('servers.servers.list.headers.address') }}</md-table-head>
                        <md-table-head scope="col">{{ $t('servers.servers.list.headers.map') }}</md-table-head>
                        <md-table-head scope="col">{{ $t('servers.servers.list.headers.updated') }}</md-table-head>
                        <md-table-head scope="col"></md-table-head>
                    </md-table-row>
                    <Row v-for="(server,index) in servers" :key="index"
                         :server="server"
                         @delete="showDelete"
                         @history="showHistory"
                    />
                </md-table>
            </div>
        </div>
        <div class="row" v-if="serversCount === 0">
            <div class="col-sm-12 table-row-placeholder">{{ $t('servers.servers.noItems') }}</div>
        </div>
        <div class="row text-center" v-if="serversCount === -1">
            <div class="col-sm-12 loading-spinner">
                <MoonLoader/>
            </div>
        </div>
    </div>
</template>

<script>
    import Row from './Row';
    import { mapGetters } from "vuex";
    import {SELECT_SERVER} from "../../store/actions.type";
    import MoonLoader from 'vue-spinner/src/MoonLoader.vue';

    export default {
        name: 'CardView',
        components: {
            MoonLoader,
            Row,
        },
        methods: {
            showHistory(server) {
                this.$store.dispatch(SELECT_SERVER, server);
                this.$emit("showHistory");
            },
            showDelete(server) {
                this.$store.dispatch(SELECT_SERVER, server);
                this.$emit("showDelete");
            }
        },
        mounted() {

        },
        computed: {
            ...mapGetters(["servers", "serversCount", "serverSelected"]),
        }
    }
</script>

<style scoped>
    .list-view {
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
