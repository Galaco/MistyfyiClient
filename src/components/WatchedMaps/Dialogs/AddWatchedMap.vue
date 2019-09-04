<template>
    <md-dialog :md-active="show" id="addMapNameDialog" @md-clicked-outside="close">
        <md-dialog-title>{{ $t('servers.mapNames.dialogs.add.title') }}</md-dialog-title>
        <md-dialog-content>
            <form novalidate class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="adduserlevel_name">{{ $t('servers.mapNames.dialogs.add.form.name') }}</label>
                        <md-input name="name" id="adduserlevel_name" v-model="userLevelName"/>
                    </md-field>
                </div>
            </form>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="submit">{{ $t('dialog.buttons.save') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('dialog.buttons.cancel') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'AddWatchedMap',
    props: {
        show: Boolean,
    },
    data: () => ({
        userLevelName: '',
    }),
    methods: {
        close() {
            this.$emit('close');
        },
        submit() {
            this.$emit('confirm', this.userLevelName);
        },
    },
});
</script>
