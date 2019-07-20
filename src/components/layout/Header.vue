<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <router-link class="navbar-brand" :to="{ name: 'home' }">
                    MapTracker
                </router-link>
            </div>
            <div>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <router-link class="navbar-brand" :to="{ name: 'servers' }" v-show="isLoggedIn()">
                            <button class="btn btn-info log" v-show="isLoggedIn()">Servers
                            </button>
                        </router-link>
                        <button class="btn btn-danger log" v-show="isLoggedIn()" @click="handleLogout()">Log out
                        </button>
                        <button class="btn btn-info log" v-show="!isLoggedIn()" @click="handleLogin()">Log In</button>
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
</style>
