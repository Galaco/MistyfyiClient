<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ $t('popular.maps.title') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row
        v-if="popularItems.maps.length > 0"
        justify="center"
        align="center"
      >
        <v-col
          v-for="(mapName,index) in popularItems.maps"
          :key="index"
          justify="bottom"
          align="bottom"
          cols="10"
          sm="3"
        >
          <Item
            :model="mapName"
          />
        </v-col>
      </v-row>
      <div v-if="isPopularItemsLoading === true" class="row text-center">
        <div class="loading-spinner">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Item from './Item.vue'

export default Vue.extend({
  name: 'PopularMapNames',
  components: {
    Item
  },
  computed: {
    ...mapGetters(['popularItems', 'isPopularItemsLoading'])
  }
})
</script>
