<template>
    <md-dialog :md-active="show"  @md-clicked-outside="close">
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

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
});
</script>
