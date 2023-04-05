<template>
  <div class="feedRoot">
    <v-container>
      <FeedList />
    </v-container>
    <ServerList />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import FeedList from "@/components/Feed/FeedList.vue"
import ServerList from "@/components/ServerList/ServerList.vue"
import { FETCH_FEED, FETCH_SERVERS } from "@/store/actions.type"

export default Vue.extend({
  middleware: ["auth"],
  layout: "app",
  name: "Feed",
  components: {
    FeedList,
    ServerList,
  },
  transition: {
    css: true,
  },
  data: () => ({
    refreshTimeout: -1,
  }),
  destroyed() {
    clearInterval(this.refreshTimeout)
  },
  mounted() {
    this.refresh()

    // @ts-ignore
    this.refreshTimeout = setInterval(this.refresh, 60000)
  },
  methods: {
    refresh() {
      this.refreshFeed()
      this.refreshServers()
    },
    refreshFeed() {
      this.$store.dispatch(FETCH_FEED).catch((err: Error) => {
        this.$toast.error(err.message)
      })
    },
    refreshServers() {
      this.$store.dispatch(FETCH_SERVERS).catch((err: Error) => {
        this.$toast.error(err.message)
      })
    },
  },
  head() {
    return {
      title: "Home",
    }
  },
})
</script>

<style lang="scss" scoped>
.feedRoot {
  height: calc(100vh - 64px);
  overflow-y: auto;
  margin-right: 320px;
}

.container {
  max-width: 880px;
}

@media only screen and (max-width: 960px) {
  .feedRoot {
    margin-right: 0;
  }
}
</style>
