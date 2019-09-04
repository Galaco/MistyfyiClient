<template>
  <div>
    <App v-if="isLoggedIn() && !$route.meta.staticPage"/>
    <router-view v-if="!isLoggedIn() || $route.meta.staticPage"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import App from './components/Layout/App.vue';

export default Vue.extend({
  name: 'app',
  components: {
    App,
  },
  methods: {
    isLoggedIn() {
      return this.$auth.isAuthenticated();
    },
  },
});
</script>

<style src="./assets/app.scss" lang="scss"></style>
