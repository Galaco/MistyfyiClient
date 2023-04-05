<template>
  <tr class="server">
    <td>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ server.name }}
          </span>
        </template>
        <span>{{ $t('home.about.preview.nameTooltip') }}</span>
      </v-tooltip>
    </td>
    <td class="map-name">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ server.current_map }}
          </span>
        </template>
        <span>{{ $t('home.about.preview.mapTooltip') }}</span>
      </v-tooltip>
    </td>
    <td class="game-name">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ server.game }}
          </span>
        </template>
        <span>{{ $t('home.about.preview.gameTooltip') }}</span>
      </v-tooltip>
    </td>
    <td class="players">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ server.players }}
          </span>
        </template>
        <span>{{ $t('home.about.preview.playersTooltip') }}</span>
      </v-tooltip>
    </td>
    <td class="last-updated">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ server.last_updated }}
          </span>
        </template>
        <span>{{ $t('home.about.preview.dateTooltip') }}</span>
      </v-tooltip>
    </td>
  </tr>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  name: 'MockInterfaceRow',
  props: {
    server: {
      type: Object,
      default: () => {}
    }
  }
})
</script>
