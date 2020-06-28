<template>
  <Add
    id="addServerDialog"
    :title="$t('servers.dialogs.add.title')"
    :show="show"
    :confirm-disabled="!formValid || sending"
    @confirm="addServer"
    @deny="close"
  >
    <v-form ref="form" v-model="formValid" :lazy-validation="false">
      <v-text-field
        id="addserver_ip"
        v-model="serverIP"
        :rules="[
          v => ipAddressRegex.test(v) || $t('servers.dialogs.add.form.ipError'),
        ]"
        :label="$t('servers.dialogs.add.form.ip')"
        required
        :disabled="sending"
      />
      <v-text-field
        id="addserver_port"
        v-model="serverPort"
        :rules="[
          v =>
            (v !== undefined && v > -1 && v < 65536) ||
            $t('servers.dialogs.add.form.portError'),
        ]"
        :label="$t('servers.dialogs.add.form.port')"
        required
        :disabled="sending"
      />
    </v-form>
    <v-progress-linear v-if="sending" indeterminate color="#4588d2" />
  </Add>
</template>

<script lang="ts">
import Vue from "vue"
import Add from "@/components/Dialogs/Add.vue"

// eslint-disable-next-line
const ipAddressRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/

export default Vue.extend({
  name: "AddServer",
  components: {
    Add,
  },
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    formValid: false,
    serverIP: "",
    serverIPValid: false,
    serverPort: 0,
    serverPortValid: true,
    sending: false,
    ipAddressRegex: /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/,
  }),
  methods: {
    close() {
      this.reset()
      this.$emit("deny")
    },
    submit() {
      this.reset()
      this.$emit("confirm")
    },
    reset() {
      this.sending = false
      this.serverIP = ""
      this.serverPort = 0
    },
    addServer() {
      this.sending = true
      this.$repositories.servers
        .addNewServer(this.serverIP, Number(this.serverPort))
        .then(() => {
          this.$toast.success(
            this.$t("servers.toast.add.success", {
              ip: this.serverIP,
              port: this.serverPort,
            })
          )
          this.submit()
        })
        .catch(err => {
          this.$toast.error(err.message)
          this.sending = false
        })
    },
  },
})
</script>
