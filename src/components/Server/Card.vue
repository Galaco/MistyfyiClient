<template>
    <div class="server card">
        <img class="card-img-top" src="#" alt="#">
        <div class="card-body">
            <h5 class="card-title">{{ server.name }}</h5>
            <p class="card-subtitle mb-2 text-muted">{{ server.ip_address }}:{{ server.port}}</p>
            <p class="card-text map-name">{{ server.current_map }}</p>
            <LastUpdated :date="server.last_updated"/>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-secondary float-left" @click="history">
                <i class="material-icons btn-icon">history</i>
                <span>{{ $t('servers.servers.buttons.history') }}</span>
            </button>
            <button type="button" class="btn btn-danger float-right" @click="deleteServer">
                <i class="material-icons btn-icon">delete</i>
                <span>{{ $t('servers.servers.buttons.delete') }}</span>
            </button>
        </div>
    </div>
</template>

<script>
    import LastUpdated from './LastUpdated';

    export default {
        name: 'ServerCard',
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
    .server.card {
        margin-bottom: 15px;
        padding: 0;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    }
    .server.card img {
        background-color: #DDD;
        width: 100%;
        height: 140px;
    }
    .server .card-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .map-name {
        height: 3rem;
        overflow-y: hidden;
    }
    .card-footer button {
        font-size: 0.8rem;
    }
</style>
