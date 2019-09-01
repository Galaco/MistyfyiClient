<template>
    <md-dialog :md-active.sync="show" id="addMapNameModal">
        <md-dialog-title>{{ $t('servers.mapNames.modals.add.title') }}</md-dialog-title>
        <md-content>
            <form novalidate class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="adduserlevel_name">{{ $t('servers.mapNames.modals.add.form.name') }}</label>
                        <md-input name="name" id="adduserlevel_name" v-model="userLevelName"/>
                    </md-field>
                </div>
            </form>
        </md-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="submit">{{ $t('modal.buttons.save') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('modal.buttons.cancel') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    export default {
        name: 'modal',
        props: {
            show: Boolean,
        },
        data: () => {
            return {
                userLevelName: '',
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                this.$emit('confirm', this.userLevelName);
            },
        },
    };
</script>
