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

<script>
    import Delete from '../../Dialogs/Delete';
    export default {
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
    };
</script>
