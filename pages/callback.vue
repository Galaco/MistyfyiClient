<template>
  <span />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'app',
  name: 'Callback',
  head () {
    return {
      title: 'Logging you in...'
    }
  }
})
</script>
