<template>
  <div>
    <App v-if="isLoggedIn() && !$route.meta.staticPage"/>
    <router-view v-if="!isLoggedIn() || $route.meta.staticPage"/>
  </div>
</template>

<script>
  import {isLoggedIn} from "./utils/auth";
  import App from "./components/layout/App";

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

<style>
  * {
    box-sizing: border-box;
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }

  .btn-icon {
    margin-top: -4px;
    vertical-align:middle;
    font-size: 18px;
  }
</style>
