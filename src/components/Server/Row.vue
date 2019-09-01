<template>
    <md-table-row class="server">
        <md-table-cell class="list-text">{{ server.name }}</md-table-cell>
        <md-table-cell class="list-text">{{ server.ip_address }}:{{ server.port}}</md-table-cell>
        <md-table-cell class="list-text map-name">{{ server.current_map }}</md-table-cell>
        <md-table-cell class="list-text last-updated"><LastUpdated :date="server.last_updated"/></md-table-cell>
        <md-table-cell class="list-controls">
            <md-button class="md-icon-button md-primary md-raised" @click="history">
                <md-icon>history</md-icon>
                <md-tooltip md-direction="bottom">{{ $t('servers.servers.buttons.history') }}</md-tooltip>
            </md-button>
            <md-button class="md-icon-button md-accent md-raised" @click="deleteServer">
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="bottom">{{ $t('servers.servers.buttons.delete') }}</md-tooltip>
            </md-button>
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

<style scoped>
   .list-controls {
       min-width: 160px;
   }
</style>
