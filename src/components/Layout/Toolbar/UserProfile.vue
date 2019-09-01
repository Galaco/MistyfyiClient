<template>
    <md-menu md-direction="bottom-end">
        <md-button md-menu-trigger class="md-icon-button" id="toolbarProfileButton">
            <md-avatar class="md-avatar-icon md-secondary">
                <md-icon>account_circle</md-icon>
            </md-avatar>
        </md-button>

        <md-menu-content>
            <md-menu-item v-show="isLoggedIn()">
                {{(!userProfile || !userProfile.isSubscribed)? "Free user": "Premium user"}}
            </md-menu-item>
            <span></span>
            <md-menu-item @click="handleLogin()" v-show="!isLoggedIn()" id="toolbarLoginButton">Log In</md-menu-item>
            <md-menu-item @click="handleLogout()" v-show="isLoggedIn()" id="toolbarLogoutButton">Log Out</md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
    import { mapGetters } from "vuex";
    import {isLoggedIn, login, logout} from '../../../utils/auth';

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
        },
        computed: {
            ...mapGetters(["userProfile"]),
        }
    }
</script>
