<template>
  <div class="container card-view">
    <div v-if="serversCount === -1" class="row text-center">
      <div class="loading-spinner">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        />
      </div>
    </div>
    <div>
      <div v-for="(server,index) in servers" :key="index">
        <Card
          :server="server"
          @delete="showDelete"
          @history="showHistory"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { SELECT_SERVER } from '@/store/actions.type'
import Card from './Card.vue'

export default Vue.extend({
  name: 'CardView',
  components: {
    Card
  },
  computed: {
    ...mapGetters(['servers', 'serversCount', 'serverSelected'])
  },
  methods: {
    showHistory (server: any) {
      this.$store.dispatch(SELECT_SERVER, server)
      this.$emit('showHistory')
    },
    showDelete (server: any) {
      this.$store.dispatch(SELECT_SERVER, server)
      this.$emit('showDelete')
    }
  }
})
</script>

<style lang='scss' scoped>
    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
