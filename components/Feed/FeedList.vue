<template>
  <div>
    <Card
      v-for="(feedItem,index) in feedItems"
      :key="index"
      :model="feedItem"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Card from './Card.vue'

export default Vue.extend({
  name: 'Feed',
  components: {
    Card
  },
  computed: {
    ...mapGetters(['feedItems', 'feedItemsCount', 'isFeedItemsLoading'])
  },
  mounted () {
  }
})
</script>
