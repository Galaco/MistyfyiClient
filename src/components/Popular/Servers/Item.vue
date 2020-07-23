<template>
  <tr>
    <td>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ server.name }}</span>
        </template>
        <span>{{ $t("servers.server.name.tooltip") }}</span>
      </v-tooltip>
    </td>
    <td>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ server.game }}</span>
        </template>
        <span>{{ $t("servers.server.game.tooltip") }}</span>
      </v-tooltip>
    </td>
    <td class="controls" align="center">
      <v-btn :disabled="!canUserAdd || saving || added" @click="onAdd">
        <span v-if="canUserAdd && !saving && !added">
          {{ $t("popular.servers.actions.add.button") }}
        </span>
        <span v-if="canUserAdd && saving && added">
          {{ $t("popular.servers.actions.add.saving") }}
          <Spinner :size="16" :width="2" />
        </span>
        <span v-if="!canUserAdd || added">
          {{ $t("popular.servers.actions.add.watched") }}
        </span>
      </v-btn>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue"
import Server from "@/models/api/servers/Server"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"

export default Vue.extend({
  name: "Item",
  components: {
    Spinner,
  },
  props: {
    server: {
      type: Server,
      default: () => new Server("", ""),
    },
    canUserAdd: {
      type: Boolean,
      default: () => false,
    },
  },
  data: () => ({
    saving: false,
    added: false,
  }),
  methods: {
    onAdd() {
      if (!this.canUserAdd && !this.saving && !this.added) {
        return
      }
      this.addServer()
    },
    addServer() {
      this.saving = true
      this.$repositories.servers
        .addNewServer(this.server.ipAddress, this.server.port)
        .then(() => {
          this.$toast.success(
            this.$t("servers.toast.add.success", { ip: this.server.name })
          )
          this.saving = false
          this.added = true
        })
        .catch((err: Error) => {
          this.$toast.error(err.message)
          this.saving = false
        })
    },
  },
})
</script>

<style lang="scss" scoped>
.controls {
  width: 120px;
  min-width: 120px;
}

@media only screen and (max-width: 585px) {
  th {
    display: none;
  }

  tr:hover {
    background-color: none;
  }

  td {
    display: block;
    height: auto;
    padding: 0;
  }

  td:first-child {
    font-weight: bold;
  }

  td:last-child {
    display: none;
  }

  td:not(:last-child) {
    display: block;
  }
}
</style>
