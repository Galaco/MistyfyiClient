<template>
  <md-card md-with-hover>
    <md-card-media>
      <img class="card-img-top" src="#" :alt="`map thumbnail`">
    </md-card-media>
    <md-card-header>
      <div>
        {{ server.name }}
      </div>
      <div>
        {{ server.ip_address }}:{{ server.port }}
      </div>
    </md-card-header>
    <md-card-content>
      <p class="card-text map-name">
        {{ server.current_map }}
      </p>
      <LastUpdated :date="server.last_updated" />
    </md-card-content>
    <md-card-actions>
      <v-btn @click="history">
        <v-icon>mdi-history</v-icon>
        <span>{{ $t('servers.buttons.history') }}</span>
      </v-btn>
      <v-btn @click="deleteServer">
        <v-icon>mdi-delete</v-icon>
        <span>{{ $t('servers.buttons.delete') }}</span>
      </v-btn>
    </md-card-actions>
  </md-card>
</template>

<script lang="ts">
import Vue from 'vue'
import LastUpdated from './LastUpdated.vue'

export default Vue.extend({
  name: 'Card',
  components: {
    LastUpdated
  },
  props: {
    server: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    history () {
      this.$emit('history', this.server)
    },
    deleteServer () {
      this.$emit('delete', this.server)
    }
  }
})
</script>

<style lang='scss' scoped>
    .md-card {
        margin: 4px;

        .md-title {
            text-overflow: ellipsis;
            overflow: hidden;
            height: 64px;
        }

        .md-card-media {
            background-color: #DDD;
        }

        img {
            width: 100%;
            height: 140px;
            text-align: center;
            line-height: 140px;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .map-name {
            min-height: 22px;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>
