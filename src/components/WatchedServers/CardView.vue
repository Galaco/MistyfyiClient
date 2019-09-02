<template>
    <div class="container card-view">
        <div class="row text-center" v-if="serversCount === -1">
            <div class="col-sm-12 loading-spinner">
                <MoonLoader/>
            </div>
        </div>
        <div class="md-layout md-alignment-center">
            <div v-for="(server,index) in servers" :key="index" class="md-layout-item md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                <Card :server="server"
                      @delete="showDelete"
                      @history="showHistory"
                />
            </div>
        </div>
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

<style scoped lang="scss">
    .md-layout-item {
        padding-left: 8px;
        padding-right: 8px;

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            padding-right: 0;
        }
    }
    .card-view {
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
