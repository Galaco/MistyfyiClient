<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>
        {{ $t("popular.maps.title") }}
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row
        v-if="popularItems.maps.length > 0"
        justify="center"
        align="center"
      >
        <v-col
          v-for="(mapName, index) in popularItems.maps"
          :key="index"
          justify="bottom"
          align="bottom"
          cols="10"
          sm="3"
        >
          <Item :model="mapName" />
        </v-col>
      </v-row>
      <div v-if="isPopularItemsLoading === true" class="row text-center">
        <div class="col-sm-12 loading-spinner">
          <Spinner />
        </div>
      </div>
      <div
        v-if="isPopularItemsLoading === false && popularItems.maps.length == 0"
        class="row text-center"
      >
        <div class="col-sm-12 loading-spinner">
          {{ $t("popular.maps.insufficientData") }}
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"
import Item from "./Item.vue"
import Spinner from "@/components/LoadingIndicator/Spinner.vue"

export default Vue.extend({
  name: "PopularMapNames",
  components: {
    Item,
    Spinner,
  },
  computed: {
    ...mapGetters(["popularItems", "isPopularItemsLoading"]),
  },
})
</script>

<style lang="scss" scoped>
.loading-spinner {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
