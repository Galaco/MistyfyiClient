<template>
    <div class="md-toolbar-section-end" style="margin-right: 32px; overflow-x: hidden;">
        <span :v-if="this.$auth.isAuthenticated()" class="md-body-2 user-email">{{ this.$auth.user.email }}</span>
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
                <md-menu-item @click="handleLogin()" v-show="!isLoggedIn()" id="toolbarLoginButton">{{ $t('header.links.login') }}</md-menu-item>
                <md-menu-item @click="handleLogout()" v-show="isLoggedIn()" id="toolbarLogoutButton">{{ $t('header.links.logout') }}</md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
    name: 'UserProfile',
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
    computed: {
        ...mapGetters(['userProfile']),
    },
});
</script>

<style lang="scss" scoped>
    .user-email {
        margin-right: 8px;
        text-overflow: ellipsis;
        overflow-x: hidden;
    }
</style>
