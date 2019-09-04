<template>
    <span>
        <md-toolbar class="md-transparent" md-elevation="0">
            <router-link class="navbar-brand md-title" :to="{ name: 'home' }">
                <i class="material-icons app-icon">devices</i>
                <span class="navbar-brand-title">{{ $t('app_title') }}</span>
            </router-link>
        </md-toolbar>
        <md-divider></md-divider>
        <md-list>
            <md-list-item :to="{ name: 'servers' }" exact>
                <md-icon>view_list</md-icon>
                <span class="md-list-item-text">Servers</span>
            </md-list-item>
        </md-list>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Drawer',
});
</script>

<style lang="scss" scoped>
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
</style>
