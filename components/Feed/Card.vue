<template>
  <v-card>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{ model.mapName }}</v-card-title>
    </v-img>
    <v-card-subtitle>{{ model.serverName }} is now playing {{ model.mapName }}</v-card-subtitle>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Item from '@/models/api/feed/Item'

export default Vue.extend({
  name: 'Card',
  props: {
    model: {
      type: Item,
      default: () => new Item('', 0, '', '', 0)
    }
  }
})
</script>
