<template>
    <Delete
        id="deleteServerDialog"
        :title="$t('servers.servers.dialogs.delete.title')"
        @confirm="submit"
        @deny="close"
        :show="show"
        >
        <span>{{ $t('servers.servers.dialogs.delete.body') }}</span>
    </Delete>
</template>

<script lang="ts">
import Vue from 'vue';
import Delete from '@/components/Dialogs/Delete.vue';

export default Vue.extend({
    name: 'DeleteServer',
    components: {
        Delete,
    },
    props: {
        show: Boolean,
    },
    methods: {
        close() {
            this.$emit('deny');
        },
        submit() {
            this.$emit('confirm');
        },
    },
});
</script>
