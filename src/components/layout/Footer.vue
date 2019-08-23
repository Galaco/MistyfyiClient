<template>
    <footer class="footer py-4 bg-dark text-white-50">
        <div class="container text-center">
            <router-link class="logo-font" :to="{ name: 'home', params: {} }">
                {{ $t('app_title') }}
            </router-link>{{ $t('footer.description') }}
            <span class="attribution">{{ $t('footer.owner') }}
        <a rel="noopener noreferrer" target="blank" href="https://www.galaco.me">
          Galaco</a
        > &copy; <span id="footer-year">{{ this.currentYear }}</span>.
      </span>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",

        data() {
            return {
                currentYear: new Date().getFullYear()
            }
        }
    };
</script>

<style scoped>
    footer {
        margin-top: auto !important;
        padding-bottom: 1rem !important;
        padding-top: 1rem !important;
        flex-shrink: none;
    }

    footer a {
        color: #B2B2FF;
    }
</style>
