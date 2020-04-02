<template>
  <tr>
    <td class="v-center">
      {{ model.name }}
    </td>
    <td class="v-center">
      {{ getServerNameFromId(model.server_id) }}
    </td>
    <td class="v-center">
      <v-switch
        v-model="isEnabled"
        @change="onDisable"
      />
    </td>
    <td class="controls" align="center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="pink"
            v-on="on"
            @click="onDelete(model)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('servers.mapNames.buttons.delete') }}</span>
      </v-tooltip>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { DISABLE_MAP_NAME } from '@/store/actions.type'
import Map from '@/models/api/levels/map'

export default Vue.extend({
  name: 'MapRow',
  props: {
    model: {
      type: Object,
      default: new Map()
    },
    getServerNameFromId: {
      type: Function,
      default: () => ''
    },
    onDelete: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      isEnabled: true
    }
  },
  mounted () {
    this.isEnabled = !this.model.disabled
  },
  methods: {
    onDisable (value: boolean) {
      this.$store.dispatch(DISABLE_MAP_NAME, { model: this.model, isDisabled: !value }).then(() => {
        this.model.disabled = !value
        this.isEnabled = value
        if (value === true) {
          this.$toast.success(this.$t('servers.mapNames.toast.enable.success', { name }))
        } else {
          this.$toast.success(this.$t('servers.mapNames.toast.disable.success', { name }))
        }
      }).catch((err) => {
        this.$toast.error(err.message)
      })
    }
  }
})
</script>

<style lang='scss' scoped>
    th.controls {
        text-align: center;
        width: 160px;
        min-width: 160px;
    }
</style>
