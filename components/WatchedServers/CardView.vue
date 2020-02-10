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
    <div class="md-layout md-alignment-center">
      <div v-for="(server,index) in servers" :key="index" class="md-layout-item md-large-size-25 md-medium-size-33 md-small-size-50 md-xsmall-size-100">
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
import Card from './Card.vue'
import { SELECT_SERVER } from '@/store/actions.type'

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
    .md-layout-item {
        padding-left: 8px;
        padding-right: 8px;

        &:first-child {
            padding-left: 0;
        }

        &:last-child {
            padding-right: 0;
        }
    }

    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
