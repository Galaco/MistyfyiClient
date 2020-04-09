<template>
  <v-navigation-drawer
    width="320px"
    right="right"
    absolute
    dark
  >
    <v-list v-if="servers.length > 0">
      <v-subheader>{{ $t('feed.serverList.title') }} </v-subheader>
      <Row
        v-for="(server,index) in servers"
        :key="index"
        :server="server"
      />
    </v-list>
    <div v-if="serversCount === -1" class="row text-center">
      <div class="col-sm-12 loading-spinner">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Row from './TableRow.vue'

export default Vue.extend({
  name: 'ServerList',
  components: {
    Row
  },
  computed: {
    ...mapGetters(['servers', 'serversCount', 'isServersLoading'])
  }
})
</script>

<style lang='scss' scoped>

</style>
