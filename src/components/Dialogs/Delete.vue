<template>
    <md-dialog :md-active.sync="show" :md-click-outside-to-close="false">
        <md-dialog-title>{{ title }}</md-dialog-title>
        <md-dialog-content>
            <slot />
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-accent" @click="submit">{{ $t('dialog.buttons.delete') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('dialog.buttons.cancel') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>

    export default {
        name: 'Delete',
        props: {
            show: Boolean,
            title: String,
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
