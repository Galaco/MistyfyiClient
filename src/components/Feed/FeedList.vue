<template>
  <div>
    <Card
      v-for="(feedItem,index) in feedItems"
      :key="index"
      :model="feedItem"
    />
    <div v-if="feedItemsCount === -1 && isFeedItemsLoading === true" class="row text-center loadingContainer">
      <div class="col-sm-12 loading-spinner">
        <Spinner />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Card from './Card.vue'
import Spinner from '@/components/LoadingIndicator/Spinner.vue'

export default Vue.extend({
  name: 'Feed',
  components: {
    Card,
    Spinner
  },
  computed: {
    ...mapGetters(['feedItems', 'feedItemsCount', 'isFeedItemsLoading'])
  }
})
</script>

<style lang='scss' scoped>
  .loadingContainer {
    min-height: calc( 100vh - 96px);

    .loading-spinner {
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
</style>
