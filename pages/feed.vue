<template>
  <div class="feedRoot">
    <FeedList />
    <ServerList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FeedList from '@/components/Feed/FeedList.vue'
import ServerList from '@/components/ServerList/ServerList.vue'
import { FETCH_FEED, FETCH_SERVERS } from '@/store/actions.type'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Feed',
  components: {
    FeedList,
    ServerList
  },
  transition: {
    css: true
  },
  mounted () {
    this.$store.dispatch(FETCH_FEED).catch((err) => {
      this.$toast.error(err.message)
    })
    this.$store.dispatch(FETCH_SERVERS).catch((err) => {
      this.$toast.error(err.message)
    })
  },
  head () {
    return {
      title: 'Home'
    }
  }
})
</script>

<style lang="scss" scoped>
.feedRoot {
  height: calc(100vh - 88px);
  overflow-y: auto;
}
</style>
