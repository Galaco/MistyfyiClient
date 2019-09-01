<template>
    <nav class="navbar">
        <md-toolbar>
            <router-link class="navbar-brand md-title" :to="{ name: 'home' }">
                <i class="material-icons app-icon">devices</i>
                <span class="navbar-brand-title">{{ $t('app_title') }}</span>
            </router-link>

            <div class="md-toolbar-section-end">
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

<script>
    import {isLoggedIn, login, logout} from '../../utils/auth';

    export default {
        name: "Header",
        data() {
            return {
              navCollapsed: true,
            };
        },
        methods: {
            handleLogin() {
                login();
            },
            handleLogout() {
                logout();
            },
            isLoggedIn() {
                return isLoggedIn();
            },
        }
    };
</script>

<style scoped>
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

    .navbar-brand-title {
        vertical-align: middle;
    }

    .app-icon {
        font-size: 20px;
        color: #fb7e14;
        height: 36px;
        width: 36px;
        line-height: 36px;
        border-radius: 50%;
        text-align: center;
        background-color: #292929;
        vertical-align:middle;
        margin-right: 16px;
    }
    .navbar-brand:hover .app-icon {
        background-color: rgb(50, 50, 50);
        color: rgb(255, 150, 24);
    }
</style>
