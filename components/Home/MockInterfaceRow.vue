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
    <td>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ server.ip_address }}:{{ server.port }}
          </span>
        </template>
        <span>{{ $t('home.about.preview.addressTooltip') }}</span>
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
    <td class="controls" align="center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            v-on="on"
          >
            <v-icon>mdi-history</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('home.about.preview.historyTooltip') }}</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="pink"
            v-on="on"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('home.about.preview.deleteTooltip') }}</span>
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
