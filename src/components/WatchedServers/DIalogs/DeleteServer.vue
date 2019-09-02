<template>
    <Delete
        id="deleteServerDialog"
        :title="$t('servers.servers.dialogs.delete.title')"
        @confirm="submit"
        @close="close"
        :show="show"
        >
        <span>{{ $t('servers.servers.dialogs.delete.body') }}</span>
    </Delete>
</template>

<script>
    import Delete from '../../Dialogs/Delete';
    export default {
        name: 'DeleteServer',
        components: {
            Delete
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
