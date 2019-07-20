<template>
    <footer class="footer py-4 bg-dark text-white-50">
        <div class="container">
            <router-link class="logo-font" :to="{ name: 'home', params: {} }">
                MapTracker
            </router-link>
            <span class="attribution">
        A Go x Vue application by
        <a rel="noopener noreferrer" target="blank" href="https://www.galaco.me">
          Galaco</a
        >.
      </span>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer"
    };
</script>

<style scoped>
footer {
    margin-top: auto !important;
    padding-bottom: 1rem !important;
    padding-top: 1rem !important;
    flex-shrink: none;

}
</style>