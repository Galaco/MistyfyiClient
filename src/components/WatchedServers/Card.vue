<template>
    <md-card md-with-hover>
        <md-card-media>
            <img class="card-img-top" src="#" v-bind:alt="`map thumbnail`">
        </md-card-media>
        <md-card-header>
            <div class="md-title">{{ server.name }}</div>
            <div class="md-subhead">{{ server.ip_address }}:{{ server.port}}</div>
        </md-card-header>
        <md-card-content>
            <p class="card-text map-name">{{ server.current_map }}</p>
            <LastUpdated :date="server.last_updated"/>
        </md-card-content>
        <md-card-actions>
            <md-button class="md-primary" @click="history">
                <i class="material-icons btn-icon">history</i>
                <span>{{ $t('servers.servers.buttons.history') }}</span>
            </md-button>
            <md-button class="md-accent" @click="deleteServer">
                <i class="material-icons btn-icon">delete</i>
                <span>{{ $t('servers.servers.buttons.delete') }}</span>
            </md-button>
        </md-card-actions>
    </md-card>
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

<style lang="scss" scoped>
    .md-card {
        margin: 4px;

        .md-title {
            text-overflow: ellipsis;
            overflow: hidden;
            height: 64px;
        }

        .md-card-media {
            background-color: #DDD;
        }

        img {
            width: 100%;
            height: 140px;
            text-align: center;
            line-height: 140px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>
