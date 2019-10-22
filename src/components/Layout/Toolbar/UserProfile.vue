<template>
    <div class="md-toolbar-section-end" style="margin-right: 32px; overflow-x: hidden;">
        <span v-if="this.$auth.isAuthenticated()" class="md-body-2 user-email">{{ this.$auth.user.email }}</span>
        <md-menu md-direction="bottom-end" md-align-trigger>
            <md-button md-menu-trigger class="md-icon-button" id="toolbarProfileButton">
                <md-avatar class="md-avatar-icon md-secondary">
                    <md-icon>account_circle</md-icon>
                </md-avatar>
            </md-button>

            <md-menu-content>
                <md-menu-item v-show="isLoggedIn()">
                    <md-icon>{{ (!userProfile || !userProfile.isSubscribed)? "computer": "star" }}</md-icon>
                    <span v-if="!userProfile || !userProfile.isSubscribed">{{ $t('account.types.free') }}</span>
                    <div v-show="userProfile && userProfile.isSubscribed">
                        <div class="text-right">
                            <span class="md-body-2">{{ $t('account.types.paid') }}</span>
                        </div>
                        <div>
                            <span class="md-caption">{{ $t('header.profile.expiresAt') }} {{ DateToString(userProfile.dateExpires) }}</span>
                        </div>
                    </div>
                </md-menu-item>
                <md-menu-item @click="handleLogin()" v-show="!isLoggedIn()" id="toolbarLoginButton">
                    <span>{{ $t('header.links.login') }}</span>
                </md-menu-item>
                <md-menu-item @click="handleLogout()" v-show="isLoggedIn()" id="toolbarLogoutButton">
                    <md-icon>cancel</md-icon>
                    <span>{{ $t('header.links.logout') }}</span>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { DateToDateString } from '@/locale/time';

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
        DateToString(date: number): string {
            return DateToDateString(new Date(date * 1000));
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
