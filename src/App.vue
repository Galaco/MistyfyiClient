<template>
  <div>
    <App v-if="isLoggedIn() && !$route.meta.staticPage"/>
    <router-view v-if="!isLoggedIn() || $route.meta.staticPage"/>
  </div>
</template>

<script>
  import {isLoggedIn} from "./utils/auth";
  import App from "./components/Layout/App";

export default {
  name: 'app',
  components: {
    App
  },
  methods: {
    isLoggedIn,
  }
}
</script>

<style src="./assets/app.scss" lang="scss"></style>
