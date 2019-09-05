<template>
    <md-dialog :md-active="show" id="addMapNameDialog" @md-clicked-outside="close">
        <md-dialog-title>{{ $t('servers.mapNames.dialogs.add.title') }}</md-dialog-title>
        <md-dialog-content>
            <form novalidate class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field :class="(!mapNameValid)? 'md-invalid': ''">
                        <label for="adduserlevel_name">{{ $t('servers.mapNames.dialogs.add.form.name') }}</label>
                        <md-input name="name" id="adduserlevel_name" v-model="mapName" required/>
                        <span class="md-error">{{ $t('servers.mapNames.dialogs.add.form.nameError') }}</span>
                    </md-field>
                </div>
            </form>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="submit" :disabled="!mapNameValid">{{ $t('dialog.buttons.save') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('dialog.buttons.cancel') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue';

const mapNameRegex = /^[a-zA-Z0-9-_%s]+$/;

export default Vue.extend({
    name: 'AddWatchedMap',
    props: {
        show: Boolean,
    },
    data: () => ({
        mapName: '',
        mapNameValid: false,
    }),
    methods: {
        close() {
            this.reset();
            this.$emit('close');
        },
        submit() {
            this.$emit('confirm', this.mapName);
            this.reset();
        },
        reset() {
            this.mapName = '';
        },
    },
    watch: {
        mapName(value) {
            this.mapNameValid = mapNameRegex.test(value);
        },
    },
});
</script>
