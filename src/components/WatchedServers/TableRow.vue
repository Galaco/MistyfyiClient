<template>
    <md-table-row class="server">
        <md-table-cell class="">{{ server.name }}</md-table-cell>
        <md-table-cell class="">{{ server.ip_address }}:{{ server.port}}</md-table-cell>
        <md-table-cell class=" map-name">{{ server.current_map }}</md-table-cell>
        <md-table-cell class=" last-updated"><LastUpdated :date="server.last_updated"/></md-table-cell>
        <md-table-cell class="controls">
            <div class="md-layout md-alignment-center md-gutter">
                <div class="md-layout-item md-size-40">
                    <md-button class="md-icon-button md-primary md-raised" @click="history">
                        <md-icon>history</md-icon>
                        <md-tooltip md-direction="bottom">{{ $t('servers.servers.buttons.history') }}</md-tooltip>
                    </md-button>
                </div>
                <div class="md-layout-item md-size-40">
                    <md-button class="md-icon-button md-accent md-raised" @click="deleteServer">
                        <md-icon>delete</md-icon>
                        <md-tooltip md-direction="bottom">{{ $t('servers.servers.buttons.delete') }}</md-tooltip>
                    </md-button>
                </div>
            </div>
        </md-table-cell>
    </md-table-row>
</template>

<script>
    import LastUpdated from './LastUpdated';

    export default {
        name: 'ServerRow',
        components: {
            LastUpdated,
        },
        props: {
            "server": Object,
        },
        methods: {
            history() {
                this.$emit("history", this.server);
            },
            deleteServer() {
                this.$emit("delete", this.server);
            }
        }
    }
</script>

<style scoped lang="scss">
   .controls {
       width: 160px;
       min-width: 160px;
   }
</style>
