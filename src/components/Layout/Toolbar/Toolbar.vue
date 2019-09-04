<template>
    <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="toggleMenu" id="toggleMenuButton">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">{{ title }}</span>
        </div>

        <div class="md-toolbar-section-end" style="margin-right: 32px; overflow-x: hidden;">
            <span :v-if="this.$auth.isAuthenticated()" class="md-body-2 user-email">{{ this.$auth.user.email }}</span>
            <UserProfile/>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UserProfile from './UserProfile.vue';

export default Vue.extend({
    name: 'toolbar',
    components: {
        UserProfile,
    },
    props: {
        title: String,
        toggleMenu: Function,
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