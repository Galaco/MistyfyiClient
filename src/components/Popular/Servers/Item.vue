<template>
  <tr>
    <td>
      {{ server.name }}
    </td>
    <td class="controls" align="center">
      <v-btn :disabled="!canUserAdd || saving || added" @click="onAdd">
        <span v-if="canUserAdd && !saving && !added">
          {{ $t('popular.servers.actions.add.button') }}
        </span>
        <span v-if="canUserAdd && saving && added">
          {{ $t('popular.servers.actions.add.saving') }}
          <v-progress-circular
            :size="16"
            :width="2"
            color="purple"
            indeterminate
          />
        </span>
        <span v-if="!canUserAdd || added">
          {{ $t('popular.servers.actions.add.watched') }}
        </span>
      </v-btn>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import Server from '@/models/api/servers/Server'

export default Vue.extend({
  name: 'Item',
  props: {
    server: {
      type: Server,
      default: () => new Server('', '')
    },
    canUserAdd: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => ({
    saving: false,
    added: false
  }),
  methods: {
    onAdd () {
      if (!this.canUserAdd && !this.saving && !this.added) {
        return
      }
      this.addServer()
    },
    addServer () {
      this.saving = true
      this.$repositories.servers.addNewServer(this.server.ip_address, this.server.port).then(() => {
        this.$toast.success(this.$t('servers.toast.add.success', { ip: this.server.name }))
        this.saving = false
        this.added = true
      }).catch((err: Error) => {
        this.$toast.error(err.message)
        this.saving = false
      })
    }
  }
})
</script>

<style lang='scss' scoped>
  .controls {
    width: 160px;
    min-width: 160px;
  }
</style>
