<template>
  <FeedList />
</template>

<script lang="ts">
import Vue from 'vue'
import FeedList from '@/components/Feed/FeedList.vue'
import { FETCH_FEED } from '@/store/actions.type'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Feed',
  components: {
    FeedList
  },
  transition: {
    css: true
  },
  mounted () {
    this.$store.dispatch(FETCH_FEED).catch((err) => {
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
