<template>
  <v-card>
    <v-img class="mapThumbnail" :src="`${thumbnailPath}${model.mapName}.jpg`" />
    <v-card-title>{{ model.mapName }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import WatchedMap from '@/models/api/maps/WatchedMap'

export default Vue.extend({
  name: 'Item',
  props: {
    model: {
      type: WatchedMap,
      default: () => new WatchedMap('', '')
    }
  },
  data () {
    return {
      thumbnailPath: `${process.env.NUXT_ENV_CDN_URL}/images/map/thumb/`
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
