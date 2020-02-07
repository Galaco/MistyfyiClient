<template>
  <v-dialog v-model="show" @md-clicked-outside="deny">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="showPrimary" :disabled="confirmDisabled" @click="confirm">
          {{ confirmLabel }}
        </v-btn>
        <v-btn v-if="showAccent" :disabled="confirmDisabled" @click="confirm">
          {{ confirmLabel }}
        </v-btn>
        <v-btn @click="deny">
          {{ denyLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { DialogType } from '@/utils/dialog/constants'

export default Vue.extend({
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      default: () => false
    },
    title: {
      type: String,
      default: () => ''
    },
    confirmLabel: {
      type: String,
      default: () => ''
    },
    denyLabel: {
      type: String,
      default: () => ''
    },
    confirmDisabled: {
      type: Boolean,
      default: () => false
    },
    type: {
      type: Number,
      default: () => 0
    }
  },
  computed: {
    showPrimary () {
      return this.type === DialogType.Add
    },
    showAccent () {
      return this.type === DialogType.Delete
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.deny()
      }
    }
  },
  methods: {
    deny () {
      this.$emit('deny')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
})
</script>
