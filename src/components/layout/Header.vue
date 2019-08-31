<template>
    <nav class="navbar navbar-expand-md navbar-fixed-top">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'home' }">
                <i class="material-icons app-icon">devices</i>
                <span class="navbar-brand-title">{{ $t('app_title') }}</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation" @click="navCollapsed = !navCollapsed" v-bind:class="{ collapsed: navCollapsed === true }">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse my-2 my-md-0" id="navbar-content" v-bind:class="{ show: navCollapsed === false }">
                <ul class="navbar-nav ml-auto mt-2 mt-md-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'servers' }" v-show="isLoggedIn()">
                            <md-button class="md-primary" v-show="isLoggedIn()">
                                <i class="material-icons btn-icon">view_list</i>
                                <span>{{ $t('header.links.servers') }}</span>
                            </md-button>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <md-button class="btn btn-danger md-primary" v-show="isLoggedIn()" @click="handleLogout()">
                            <i class="material-icons btn-icon">power_settings_new</i>
                            <span>{{ $t('header.links.logout') }}</span>
                        </md-button>
                        <md-button class="btn btn-info md-accent" v-show="!isLoggedIn()" @click="handleLogin()">
                            <i class="material-icons btn-icon">exit_to_app</i>
                            <span>{{ $t('header.links.login') }}</span>
                        </md-button>
                    </li>
                </ul>
            </div>
        </div>
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

    ul.navbar-nav li.nav-item {
        margin-left: 8px;
    }

    .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
</style>
