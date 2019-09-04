<template>
    <span>
        <md-toolbar class="md-transparent" md-elevation="0">
            <router-link class="navbar-brand md-title" :to="{ name: 'home' }">
               <BrandLogo/>
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
import BrandLogo from '@/components/Branding/BrandLogo.vue';

export default Vue.extend({
    name: 'Drawer',
    components: {
        BrandLogo,
    },
});
</script>