<template>
    <Add
        id="addServerDialog"
        :title="$t('servers.servers.dialogs.add.title')"
        @confirm="submit"
        @deny="close"
        :show="show"
        :confirmDisabled="!serverIPValid || !serverPortValid"
        >
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
    </Add>
</template>

<script lang="ts">
import Vue from 'vue';
import Add from '@/components/Dialogs/Add.vue';
import {addNewServer} from '@/utils/api/servers';

const ipAddressRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/;

export default Vue.extend({
    name: 'AddServer',
    components: {
        Add,
    },
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
            this.$emit('deny');
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
