<template>
    <md-dialog :md-active.sync="show" id="addServerDialog">
        <md-dialog-title>{{ $t('servers.servers.dialogs.add.title') }}</md-dialog-title>
        <md-dialog-content>
            <form novalidate class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label for="addserver_ip">{{ $t('servers.servers.dialogs.add.form.ip') }}</label>
                        <md-input name="ip" id="addserver_ip" v-model="serverIP"/>
                    </md-field>
                    <md-field>
                        <label for="addserver_ip">{{ $t('servers.servers.dialogs.add.form.port') }}</label>
                        <md-input name="port" id="addserver_port" v-model="serverPort"/>
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

<script>
    import {addNewServer} from '../../../utils/servers-api';

    export default {
        name: 'AddServer',
        props: {
            show: Boolean,
        },
        data: () => {
            return {
                serverIP: '',
                serverPort: 0,
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                addNewServer(this.serverIP, this.serverPort).then(() => {
                    this.$toasted.global.api_success({
                        message : `Now watching server: ${this.serverIP}:${this.serverPort}`
                    });
                    this.reset();
                    this.$emit('confirm');
                }).catch((err) => {
                    this.$toasted.global.api_error({
                        message : err.response.data.message
                    });
                });
            },
            reset() {
                this.serverIP = '';
                this.serverPort = '';
            }
        },
    };
</script>
