<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <router-link class="navbar-brand" :to="{ name: 'home' }">
                    <i class="material-icons app-icon">devices</i>
                    <span class="navbar-brand-title">MapTracker</span>
                </router-link>
            </div>
            <div>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <router-link class="navbar-brand" :to="{ name: 'servers' }" v-show="isLoggedIn()">
                            <button class="btn btn-info log" v-show="isLoggedIn()">Servers
                            </button>
                        </router-link>
                        <button class="btn btn-danger" v-show="isLoggedIn()" @click="handleLogout()">
                            <span>Log Out</span>
                            <i class="material-icons btn-icon">power_settings_new</i>
                        </button>
                        <button class="btn btn-info" v-show="!isLoggedIn()" @click="handleLogin()">
                            <span>Log In</span>
                            <i class="material-icons btn-icon">exit_to_app</i>
                        </button>
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
        background: #fafbfc;
        margin-bottom: 16px;
        box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03), 0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03), 0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05), 0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
    }

    .navbar-brand-title {
        margin-top: 4px;
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

    .btn-icon {
        margin-top: -4px;
        margin-left: 8px;
        vertical-align:middle;
    }
</style>
