<template>
  <v-progress-circular
    :size="size"
    :width="width"
    color="#4588d2"
    indeterminate
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Spinner',
  props: {
    size: {
      type: Number,
      default: () => 70
    },
    width: {
      type: Number,
      default: () => 7
    }
  }
})
</script>
