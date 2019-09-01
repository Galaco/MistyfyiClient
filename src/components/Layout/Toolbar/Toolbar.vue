<template>
    <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="toggleMenu" id="toggleMenuButton">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">{{ title }}</span>
        </div>

        <div class="md-toolbar-section-end" style="margin-right: 32px; overflow-x: hidden;">
            <UserProfile/>
        </div>
    </div>
</template>

<script>
    import UserProfile from './UserProfile';
    export default {
        name: "toolbar",
        components: {
            UserProfile
        },
        props: {
            title: String,
            toggleMenu: Function
        }
    }
</script>
