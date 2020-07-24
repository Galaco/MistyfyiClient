<template>
  <v-card dark>
    <div class="d-flex flex-no-wrap">
      <v-avatar class="ma-3" size="150" tile>
        <v-img
          class="mapThumbnail"
          :src="`${thumbnailPath}${model.mapName}.jpg`"
        />
      </v-avatar>
      <div class="cardContent">
        <v-card-title>{{ model.mapName }}</v-card-title>
        <v-card-subtitle>
          <span class="font-weight-bold">{{ model.serverName }}</span> is now
          playing <span class="font-weight-bold">{{ model.mapName }}</span>
        </v-card-subtitle>
        <v-card-text>
          <LastUpdated :date="model.lastUpdated" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <a :href="`steam://connect/${model.serverIP}:${model.serverPort}`">
            <v-btn color="primary" small>
              Join Server
            </v-btn>
          </a>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Item from "@/models/api/feed/Item"
import LastUpdated from "@/components/Time/LastUpdated.vue"

export default Vue.extend({
  name: "Card",
  components: {
    LastUpdated,
  },
  props: {
    model: {
      type: Item,
      default: () => new Item("", 0, "", "", 0),
    },
  },
  data() {
    return {
      thumbnailPath: `${process.env.NUXT_ENV_CDN_URL}/images/map/thumb/`,
    }
  },
})
</script>

<style lang="scss" scoped>
.v-card {
  width: 880px;
  margin-bottom: 12px;
}

.mapThumbnail {
  max-width: 400px;
  max-height: 280px;
}

.cardContent {
  flex-grow: 1;
}

@media only screen and (max-width: 585px) {
  .v-avatar {
    display: none;
  }

  .v-card__actions {
    display: none;
  }
}
</style>
