<template>
  <Add
    id="addServerDialog"
    :title="$t('servers.servers.dialogs.add.title')"
    :show="show"
    :confirm-disabled="!formValid || sending"
    @confirm="addServer"
    @deny="close"
  >
    <form novalidate class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
        <md-field :class="(!serverIPValid)? 'md-invalid': ''">
          <label for="addserver_ip">{{ $t('servers.servers.dialogs.add.form.ip') }}</label>
          <md-input id="addserver_ip" v-model="serverIP" name="ip" required :disabled="sending" />
          <span class="md-helper-text">{{ $t('servers.servers.dialogs.add.form.ipHelper') }}</span>
          <span class="md-error">{{ $t('servers.servers.dialogs.add.form.ipError') }}</span>
        </md-field>
        <md-field :class="(!serverPortValid)? 'md-invalid': ''">
          <label for="addserver_ip">{{ $t('servers.servers.dialogs.add.form.port') }}</label>
          <md-input id="addserver_port" v-model="serverPort" name="port" required :disabled="sending" />
          <span class="md-helper-text">{{ $t('servers.servers.dialogs.add.form.portHelper') }}</span>
          <span class="md-error">{{ $t('servers.servers.dialogs.add.form.portError') }}</span>
        </md-field>
      </div>
    </form>
    <md-progress-bar v-if="sending" md-mode="indeterminate" />
  </Add>
</template>

<script lang="ts">
import Vue from 'vue'
import Add from '@/components/Dialogs/Add.vue'
import { addNewServer } from '@/utils/api/servers'

const ipAddressRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/

export default Vue.extend({
  name: 'AddServer',
  components: {
    Add
  },
  props: {
    show: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    formValid: false,
    serverIP: '',
    serverIPValid: false,
    serverPort: 0,
    serverPortValid: true,
    sending: false
  }),
  watch: {
    serverIP (value) {
      this.serverIPValid = ipAddressRegex.test(value)
      this.formValid = this.serverIPValid && this.serverPortValid
    },
    serverPort (value) {
      this.serverPortValid = value !== '' && value > -1 && value < 65536
      this.formValid = this.serverIPValid && this.serverPortValid
    }
  },
  methods: {
    close () {
      this.reset()
      this.$emit('deny')
    },
    submit () {
      this.reset()
      this.$emit('confirm')
    },
    reset () {
      this.sending = false
      this.serverIP = ''
      this.serverPort = 0
    },
    addServer () {
      this.sending = true
      addNewServer(this.serverIP, this.serverPort).then(() => {
        this.$toasted.global.api_success({
          message: this.$t('servers.servers.toast.add.success', { ip: this.serverIP, port: this.serverPort })
        })
        this.submit()
      }).catch((err) => {
        this.$toasted.global.api_error({ message: err.message })
        this.sending = false
      })
    }
  }
})
</script>
