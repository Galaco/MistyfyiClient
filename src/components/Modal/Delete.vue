<template>
    <md-dialog :md-active.sync="show" @md-clicked-outside="close">
        <md-dialog-title>{{ title }}</md-dialog-title>
        <md-content>
            {{ content }}
        </md-content>
        <md-dialog-actions>
            <md-button class="md-accent" @click="submit">{{ $t('modal.buttons.delete') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('modal.buttons.cancel') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    export default {
        name: 'Delete',
        props: {
            show: Boolean,
            title: String,
            content: String,
            actions: Object,
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
