<template>
    <md-dialog :md-active="show" id="addServerDialog" @md-clicked-outside="close">
        <md-dialog-title>{{ $t('servers.servers.dialogs.add.title') }}</md-dialog-title>
        <md-dialog-content>
            <form novalidate class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field :class="(!serverIPValid)? 'md-invalid': ''">
                        <label for="addserver_ip">{{ $t('servers.servers.dialogs.add.form.ip') }}</label>
                        <md-input name="ip" id="addserver_ip" v-model="serverIP" required/>
                        <span class="md-error">{{ $t('servers.servers.dialogs.add.form.ipError') }}</span>
                    </md-field>
                    <md-field :class="(!serverPortValid)? 'md-invalid': ''">
                        <label for="addserver_ip">{{ $t('servers.servers.dialogs.add.form.port') }}</label>
                        <md-input name="port" id="addserver_port" v-model="serverPort" required/>
                        <span class="md-error">{{ $t('servers.servers.dialogs.add.form.portError') }}</span>
                    </md-field>
                </div>
            </form>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="submit" :disabled="!serverIPValid || !serverPortValid">{{ $t('dialog.buttons.save') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('dialog.buttons.cancel') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import {addNewServer} from '@/utils/api/servers';

const ipAddressRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;

export default Vue.extend({
    name: 'AddServer',
    props: {
        show: Boolean,
    },
    data: () => ({
        serverIP: '',
        serverIPValid: false,
        serverPort: 0,
        serverPortValid: true,
    }),
    methods: {
        close() {
            this.reset();
            this.$emit('close');
        },
        submit() {
            addNewServer(this.serverIP, this.serverPort).then(() => {
                this.$toasted.global.api_success({
                    message : `Now watching server: ${this.serverIP}:${this.serverPort}`,
                });
                this.reset();
                this.$emit('confirm');
            }).catch((err) => {
                this.$toasted.global.api_error({
                    message : err.response.data.message,
                });
            });
        },
        reset() {
            this.serverIP = '';
            this.serverPort = 0;
        },
    },
    watch: {
        serverIP(value) {
            this.serverIPValid = ipAddressRegex.test(value);
        },
        serverPort(value) {
            this.serverPortValid = value !== '' && value > -1 && value < 65536;
        },
    },
});
</script>
