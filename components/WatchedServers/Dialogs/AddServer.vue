<template>
  <Add
    id="addServerDialog"
    :title="$t('servers.servers.dialogs.add.title')"
    :show="show"
    :confirm-disabled="!formValid || sending"
    @confirm="addServer"
    @deny="close"
  >
    <v-form
      ref="form"
      v-model="formValid"
      :lazy-validation="false"
    >
      <v-text-field
        id="addserver_ip"
        v-model="serverIP"
        :rules="[v => ipAddressRegex.test(v) || $t('servers.servers.dialogs.add.form.ipError')]"
        :label="$t('servers.servers.dialogs.add.form.ip')"
        required
        :disabled="sending"
      />
      <v-text-field
        id="addserver_port"
        v-model="serverPort"
        :rules="[v => v !== undefined && v > -1 && v < 65536 || $t('servers.servers.dialogs.add.form.portError')]"
        :label="$t('servers.servers.dialogs.add.form.port')"
        required
        :disabled="sending"
      />

      <!-- <div class="md-layout-item md-small-size-100">
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
      </div> -->
    </v-form>
    <v-progress-linear
      v-if="sending"
      indeterminate
      color="cyan"
    />
  </Add>
</template>

<script lang="ts">
import Vue from 'vue'
import Add from '@/components/Dialogs/Add.vue'

// eslint-disable-next-line
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
    sending: false,
    ipAddressRegex: /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/
  }),
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
      this.$repository.servers.addNewServer(this.serverIP, this.serverPort).then(() => {
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
