<template>
    <Delete
            id="deleteWatchedMapDialog"
            :title="$t('servers.mapNames.dialogs.delete.title')"
            @confirm="deleteLevel"
            @deny="close"
            :show="show"
    >
        <span>{{ $t('servers.mapNames.dialogs.delete.body') }}</span>
    </Delete>
</template>

<script lang="ts">
import Vue from 'vue';
import { DELETE_LEVEL_NAMES } from '@/store/actions.type';
import Delete from '@/components/Dialogs/Delete.vue';

export default Vue.extend({
    name: 'DeleteWatchedMap',
    components: {
        Delete,
    },
    props: {
        show: Boolean,
        model: Object,
    },
    methods: {
        close() {
            this.$emit('deny');
        },
        submit() {
            this.$emit('confirm');
        },
        deleteLevel() {
            if (this.model.name.length === 0) {
                return;
            }
            const deletedName = this.model.name;
            this.$store.dispatch(DELETE_LEVEL_NAMES, this.model).then(() => {
                this.$toasted.global.api_success({
                    message: `Successfully deleted watch name: ${deletedName}`,
                });
                this.submit();
            }).catch((err) => {
                this.$toasted.global.api_error({ message : err.message });
            });
        },
    },
});
</script>
