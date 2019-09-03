<template>
    <small class="text-muted">Updated {{ formatted }}</small>
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
        this.formatted = format(new Date(this.date * 1000), 'en_US');
    },
    watch: {
        date() {
            this.formatted = format(new Date(this.date * 1000), 'en_US');
        },
    },
});
</script>
