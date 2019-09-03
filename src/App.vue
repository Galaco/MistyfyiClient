<template>
  <div>
    <App v-if="isLoggedIn() && !$route.meta.staticPage"/>
    <router-view v-if="!isLoggedIn() || $route.meta.staticPage"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {isLoggedIn} from './utils/auth';
import App from './components/Layout/App.vue';

export default Vue.extend({
  name: 'app',
  components: {
    App,
  },
  methods: {
    isLoggedIn,
  },
});
</script>

<style src="./assets/app.scss" lang="scss"></style>
