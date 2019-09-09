<template>
    <Dialog 
        @deny="close" 
        @confirm="submit"
        :show="show"
        :title="title" 
        :confirmLabel="$t('dialog.buttons.delete')"
        :denyLabel="$t('dialog.buttons.cancel')"
        :type="type"
        :confirmDisabled=false
        >
        <slot />
    </Dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from './Dialog.vue';
import { DialogType } from '@/utils/dialog/constants';

export default Vue.extend({
    name: 'Info',
    components: {
        Dialog,
    },
    props: {
        show: Boolean,
        title: String,
    },
    data: () => {
        return {
            type: DialogType.NoAction,
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
