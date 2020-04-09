<template>
  <v-card>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{ model.mapName }}</v-card-title>
    </v-img>
    <v-card-subtitle>
      <span class="font-weight-bold">{{ model.serverName }}</span> is now playing <span class="font-weight-bold">{{ model.mapName }}</span>
    </v-card-subtitle>
    <v-card-text>
      <LastUpdated :date="model.lastUpdated" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <a :href="`steam://connect/${model.serverIP}:${model.serverPort}`">
        <v-btn
          color="primary"
          text
          outlined
        >
          Join Server
        </v-btn>
      </a>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Item from '@/models/api/feed/Item'
import LastUpdated from '@/components/Time/LastUpdated.vue'

export default Vue.extend({
  name: 'Card',
  components: {
    LastUpdated
  },
  props: {
    model: {
      type: Item,
      default: () => new Item('', 0, '', '', 0)
    }
  }
})
</script>

<style lang="scss" scoped>
.v-card {
  max-width: 800px;
}
</style>
