<template>
    <Delete
        id="deleteServerModal"
        :title="$t('servers.servers.modals.delete.title')"
        :content="$t('servers.servers.modals.delete.body')"
        @submit="submit"
        @close="close"
        :show="show"
        />
</template>

<script>
    import Delete from './../../Modal/Delete';
    export default {
        name: 'modal',
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
