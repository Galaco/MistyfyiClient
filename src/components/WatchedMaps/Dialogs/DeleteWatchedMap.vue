<template>
    <Delete
            id="deleteWatchedMapDialog"
            :title="$t('servers.mapNames.dialogs.delete.title')"
            @confirm="submit"
            @close="close"
            :show="show"
    >
        <span>{{ $t('servers.mapNames.dialogs.delete.body') }}</span>
    </Delete>
</template>

<script lang="ts">
import Vue from 'vue';
import Delete from './../../Dialogs/Delete.vue';

export default Vue.extend({
    name: 'DeleteWatchedMap',
    components: {
        Delete,
    },
    props: {
        show: Boolean,
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submit() {
            this.$emit('confirm');
        },
    },
});
</script>
