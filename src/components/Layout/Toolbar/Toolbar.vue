<template>
    <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="toggleMenu" id="toggleMenuButton">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">{{ title }}</span>
        </div>
        <UserProfile/>
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