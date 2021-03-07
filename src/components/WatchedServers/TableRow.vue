<template>
  <tr
    @click="history"
  >
    <td v-if="server.name">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ server.name }}</span>
        </template>
        <span>{{ server.ipAddress }}:{{ server.port }}</span>
      </v-tooltip>
    </td>
    <td v-if="!server.name">{{ server.ipAddress }}:{{ server.port }}</td>
    <td>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on">{{ server.game }}</span>
        </template>
        <span>{{ $t("servers.server.game.tooltip") }}</span>
      </v-tooltip>
    </td>
    <td>
      {{ server.currentMap }}
    </td>
    <td>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on"
            >{{ server.playerCount }}/{{ server.maxPlayers }}</span
          >
        </template>
        <span>{{ $t("servers.server.players.tooltip") }}</span>
      </v-tooltip>
    </td>
    <td>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <LastUpdated :date="server.lastUpdated" />
          </span>
        </template>
        <span>{{ $t("servers.server.updated.tooltip") }}</span>
      </v-tooltip>
    </td>
    <td class="controls" align="center">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="pink"
            v-on="on"
            @click="deleteServer"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("servers.buttons.delete") }}</span>
      </v-tooltip>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue"
import LastUpdated from "@/components/Time/LastUpdated.vue"
import Server from "@/models/api/servers/Server"

export default Vue.extend({
  name: "TableRow",
  components: {
    LastUpdated,
  },
  props: {
    server: {
      type: Server,
      default: () => new Server("", ""),
    },
  },
  methods: {
    history() {
      this.$emit("history", this.server)
    },
    deleteServer(event: any) {
      this.$emit("delete", this.server)
      event.stopPropagation();
    },
  },
})
</script>

<style lang="scss" scoped>
.controls {
  width: 160px;
  min-width: 160px;
}

tr {
  cursor: pointer;
}

@media only screen and (max-width: 585px) {
  th {
    display: none;
  }

  tr {
    &:hover {
      background-color: none;
    }
  }

  td {
    display: block;
    height: auto;
    padding: 0;

    &:nth-child(3) {
      float: left;
      font-weight: bold;
    }

    &:nth-child(4) {
      text-align: right;
    }

    &:first-child {
      font-weight: bold;
    }

    &:last-child {
      display: none;
    }

    &:not(:nth-child(5)) {
      display: block;
      border-bottom: none !important;
    }

    &:last-child {
      display: none;
    }
  }
}
</style>
