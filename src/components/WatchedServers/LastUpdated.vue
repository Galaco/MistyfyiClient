<template>
    <small class="text-muted">{{ formatted }}</small>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from 'timeago.js';

export default Vue.extend({
    name: 'LastUpdated',
    data: () => ({
        formatted: '',
    }),
    props: {
       date: Number,
    },
    mounted() {
        if (this.date > 0) {
            this.formatted = this.$t('servers.servers.server.updated.prefix').toString() +
                format(new Date(this.date * 1000), 'en_US').toString();
        } else {
            this.formatted = this.$t('servers.servers.server.updated.notResponding').toString();
        }
    },
    watch: {
        date() {
            this.formatted = format(new Date(this.date * 1000), 'en_US');
        },
    },
});
</script>
