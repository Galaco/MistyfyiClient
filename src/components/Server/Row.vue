<template>
    <md-table-row class="server">
        <md-table-cell class="list-text">{{ server.name }}</md-table-cell>
        <md-table-cell class="list-text">{{ server.ip_address }}:{{ server.port}}</md-table-cell>
        <md-table-cell class="list-text map-name">{{ server.current_map }}</md-table-cell>
        <md-table-cell class="list-text last-updated"><LastUpdated :date="server.last_updated"/></md-table-cell>
        <md-table-cell class="list-controls">

            <md-button class="md-primary" @click="history">
                <i class="material-icons btn-icon">history</i>
                <span>{{ $t('servers.servers.buttons.history') }}</span>
            </md-button>
            <md-button class="md-accent" @click="deleteServer">
                <i class="material-icons btn-icon">delete</i>
                <span>{{ $t('servers.servers.buttons.delete') }}</span>
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
    td {
        vertical-align: middle;
    }
</style>
