<template>
  <tr>
    <td>
      <span>{{ model.name }}</span>
    </td>
    <td class="controls" align="center">
      <v-btn
        v-if="model.name.indexOf('*') === -1 || userProfile.isSubscribed"
        :disabled="!canUserAdd || saving || added"
        @click="onAdd"
      >
        <span v-if="canUserAdd && !saving && !added">
          {{ $t('popular.mapNames.actions.add.button') }}
        </span>
        <span v-if="canUserAdd && saving && !added">
          {{ $t('popular.mapNames.actions.add.saving') }}
          <Spinner
            :size="16"
            :width="2"
          />
        </span>
        <span v-if="!canUserAdd || added">
          {{ $t('popular.mapNames.actions.add.watched') }}
        </span>
      </v-btn>

      <span v-if="model.name.indexOf('*') !== -1 && !userProfile.isSubscribed">
        <v-chip
          class="ma-2"
          color="orange"
          text-color="white"
        >
          {{ $t('popular.mapNames.item.paidOnly') }}
          <v-icon right>mdi-star</v-icon>
        </v-chip>
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import WatchedMap from '@/models/api/maps/WatchedMap'
import Spinner from '@/components/LoadingIndicator/Spinner.vue'

export default Vue.extend({
  name: 'Item',
  components: {
    Spinner
  },
  props: {
    model: {
      type: WatchedMap,
      default: () => new WatchedMap('', '')
    },
    canUserAdd: {
      type: Boolean,
      default: () => false
    }
  },
  data: () => {
    return {
      saving: false,
      added: false
    }
  },
  computed: {
    ...mapGetters(['userProfile'])
  },
  methods: {
    onAdd () {
      if (!this.canUserAdd && !this.saving && !this.added) {
        return
      }
      this.addWatchName()
    },
    addWatchName () {
      this.saving = true
      this.$repositories.levels.addWatchedLevel(this.model.name, '').then(() => {
        this.$toast.success(this.$t('notifications.toast.add.success', { name }))
        this.saving = false
        this.added = true
      }).catch((err: Error) => {
        this.$toast.error(err.message)
        this.saving = false
      })
    }
  }
})
</script>

<style lang='scss' scoped>
.controls {
    width: 160px;
    min-width: 160px;
  }
</style>
