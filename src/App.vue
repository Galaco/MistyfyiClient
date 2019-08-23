<template>
  <div id="app" class="d-flex flex-column h-100">
    <Header></Header>
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
  import Header from "./components/layout/Header.vue";
  import Footer from "./components/layout/Footer.vue";

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    overflow: hidden;
  }

  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    background: #f1f4f6;
    overflow-y: auto;
  }

  #app > .content {
    flex: 1 0 auto;
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

  .modal {
    background: rgba(0, 0, 0, 0.8) !important;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-title {
    line-height: 2rem;
  }
</style>
