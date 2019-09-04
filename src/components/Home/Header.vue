<template>
    <nav class="navbar">
        <md-toolbar>
            <router-link class="md-title" :to="{ name: 'home' }">
                <BrandLogo/>
            </router-link>

            <div class="md-toolbar-section-end" style="margin-right: 32px; overflow-x: hidden;">
                <router-link :to="{ name: 'servers' }" v-show="isLoggedIn()" id="toolbarOpenAppButton">
                    <md-button class="md-primary" v-show="isLoggedIn()">
                        <span>{{ $t('header.links.openApp') }}</span>
                    </md-button>
                </router-link>
                <md-button class="md-accent" v-show="isLoggedIn()" @click="handleLogout()" id="toolbarLogoutButton">
                    <span>{{ $t('header.links.logout') }}</span>
                </md-button>
                <md-button class="md-primary" v-show="!isLoggedIn()" @click="handleLogin()" id="toolbarLoginButton">
                    <span>{{ $t('header.links.login') }}</span>
                </md-button>
            </div>
        </md-toolbar>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import BrandLogo from '@/components/Branding/BrandLogo.vue';
import UserProfile from '@/components/Layout/Toolbar/UserProfile.vue';

export default Vue.extend({
    name: 'Header',
    components: {
        BrandLogo,
        UserProfile,
    },
    data() {
        return {
          navCollapsed: true,
        };
    },
    methods: {
        handleLogin() {
            this.$auth.login();
        },
        handleLogout() {
            this.$auth.logout();
        },
        isLoggedIn() {
            return this.$auth.isAuthenticated();
        },
    },
});
</script>

<style lang="scss" scoped>
    .navbar {
        position: fixed;
        width: 100vw;
        height: 48px;
        top:0;
        left: 0;
        background: #fafbfc;
        margin-bottom: 16px;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    }
</style>
