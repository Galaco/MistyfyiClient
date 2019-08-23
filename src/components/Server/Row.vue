<template>
    <tr class="server">
        <td class="list-text">{{ server.name }}</td>
        <td class="list-text">{{ server.ip_address }}:{{ server.port}}</td>
        <td class="list-text map-name">{{ server.current_map }}</td>
        <td class="list-text last-updated"><LastUpdated :date="server.last_updated"/></td>
        <td class="list-controls">
            <button type="button" class="btn btn-secondary float-left" @click="history">
                <i class="material-icons btn-icon">history</i>
                <span>{{ $t('servers.servers.buttons.history') }}</span>
            </button>
            <button type="button" class="btn btn-danger float-right" @click="deleteServer">
                <i class="material-icons btn-icon">delete</i>
                <span>{{ $t('servers.servers.buttons.delete') }}</span>
            </button>
        </td>
    </tr>
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
