<template>
    <div class="container card-view">
        <div class="row" v-if="serversCount === 0">
            <div class="col-sm-12 table-row-placeholder">{{ $t('servers.servers.noItems') }}</div>
        </div>
        <div class="row text-center" v-if="serversCount === -1">
            <div class="col-sm-12 loading-spinner">
                <MoonLoader/>
            </div>
        </div>
        <Card v-for="(server,index) in servers" :key="index" :server="server"
              @delete="showDelete"
              @history="showHistory"
        />
    </div>
</template>

<script>
    import Card from './Card';
    import { mapGetters } from "vuex";
    import {SELECT_SERVER} from "../../store/actions.type";
    import MoonLoader from 'vue-spinner/src/MoonLoader.vue';

    export default {
        name: 'CardView',
        components: {
            MoonLoader,
            Card,
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
    .card-view {
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
