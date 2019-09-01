<template>
    <div class="page-container">
        <md-app md-waterfall md-mode="flexible" class="vh100">
            <md-app-toolbar class="md-large md-primary" style="overflow-x: hidden;">
                <Toolbar :title="this.$route.meta.header" :toggleMenu="toggleMenu"/>
            </md-app-toolbar>
            <md-app-drawer :md-active.sync="menuVisible">
                <Drawer />
            </md-app-drawer>
            <md-app-content>
                <router-view></router-view>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import Toolbar from './Toolbar/Toolbar';
    import Drawer from "./Drawer/Drawer";

    export default {
        name: 'App',
        components: {
            Drawer,
            Toolbar,
        },
        data: () => ({
            menuVisible: false
        }),
        methods: {
            toggleMenu: function() {
                this.menuVisible = !this.menuVisible;
            }
        }
    };
</script>

<style scoped>
    .vh100 {
        min-height: 100vh;
    }
    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>
