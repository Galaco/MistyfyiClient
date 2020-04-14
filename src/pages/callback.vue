<template>
  <v-container fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="10" sm="4">
        <v-card class="theme--dark">
          <v-card-title>
            <BrandLogo />
          </v-card-title>
          <v-card-text class="text-center">
            <span>{{ $t('header.links.redirecting') }}</span>
            <v-progress-circular
              :size="16"
              :width="2"
              color="purple"
              indeterminate
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import BrandLogo from '@/components/Layout/BrandLogo.vue'

export default Vue.extend({
  middleware: ['auth'],
  layout: 'empty',
  name: 'Callback',
  components: {
    BrandLogo
  },
  head () {
    return {
      title: 'Logging you in...'
    }
  }
})
</script>
