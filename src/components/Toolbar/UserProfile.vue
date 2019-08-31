<template>
    <md-menu md-direction="bottom-end">
        <md-button md-menu-trigger class="md-icon-button">
            <md-avatar class="md-avatar-icon md-accent">
                <md-icon>favorite</md-icon>
            </md-avatar>
        </md-button>

        <md-menu-content>
            <md-menu-item @click="handleLogin()" v-show="!isLoggedIn()">Log In</md-menu-item>
            <md-menu-item @click="handleLogout()" v-show="isLoggedIn()">Log Out</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
    import {isLoggedIn, login, logout} from '../../utils/auth';

    export default {
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
    }
</script>
