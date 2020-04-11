<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="4">
        <v-card>
          <v-card-title>{{ $t('app_title') }}</v-card-title>
          <v-card-text class="text-center">
            Logging you in...
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'empty',
  name: 'Callback',
  head () {
    return {
      title: 'Logging you in...'
    }
  }
})
</script>
