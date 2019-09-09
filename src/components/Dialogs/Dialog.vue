<template>
    <md-dialog :md-active="show"  @md-clicked-outside="deny">
        <md-dialog-title>{{ title }}</md-dialog-title>
        <md-dialog-content>
            <slot />
        </md-dialog-content>
        <md-dialog-actions>
            <md-button v-if="showPrimary" :disabled="confirmDisabled" class="md-primary" @click="confirm">{{ confirmLabel }}</md-button>
            <md-button v-if="showAccent" :disabled="confirmDisabled" class="md-accent" @click="confirm">{{ confirmLabel }}</md-button>
            <md-button class="md-secondary" @click="deny">{{ denyLabel }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { DialogType } from '@/utils/dialog/constants';


export default Vue.extend({
    name: 'Dialog',
    props: {
        show: Boolean,
        title: String,
        confirmLabel: String,
        denyLabel: String,
        confirmDisabled: Boolean,
        type: Number,
    },
    computed: {
        showPrimary() {
            return this.type === DialogType.Add;
        },
        showAccent() {
            return this.type === DialogType.Delete;
        },
    },
    methods: {
        deny() {
            this.$emit('deny');
        },
        confirm() {
            this.$emit('confirm');
        },
    },
});
</script>
