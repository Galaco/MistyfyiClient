<template>
    <Dialog 
        @deny="close" 
        @confirm="submit"
        :show="show"
        :title="title" 
        :confirmLabel="$t('dialog.buttons.save')"
        :denyLabel="$t('dialog.buttons.cancel')"
        :type="type"
        >
        <slot />
    </Dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from './Dialog.vue';
import { DialogType } from '@/utils/dialog/constants';

export default Vue.extend({
    name: 'Add',
    components: {
        Dialog,
    },
    props: {
        show: Boolean,
        title: String,
        confirmDisabled: Boolean,
    },
    data: () => {
        return {
            type: DialogType.Add,
        };
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
