<template>
  <v-row
    align="center"
    justify="center"
  >
    <div class="footer text-center">
      <router-link class="logo-font" :to="{ name: 'index', params: {} }">
        {{ $t('app_title') }}
      </router-link>{{ $t('footer.description') }}
      <span class="attribution">{{ $t('footer.owner') }}
        <a rel="noopener noreferrer" target="blank" href="https://www.galaco.me">
          Galaco</a> &copy; <span id="footer-year">{{ currentYear }}</span>.
      </span>
    </div>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Footer',
  data: () => ({
    currentYear: new Date().getFullYear()
  })
})
</script>

<style lang='scss' scoped>
    .footer {
        margin-top: auto !important;
        padding-bottom: 1rem !important;
        padding-top: 1rem !important;
        text-align: center;
        color: #efefef;
    }

    .footer a {
        color: #B2B2FF !important;
    }
</style>
