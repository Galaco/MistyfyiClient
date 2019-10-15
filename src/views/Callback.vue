<template>
    <span></span>
</template>

<script lang="ts">
import Vue from 'vue';
import {FETCH_USER_PROFILE} from '@/store/actions.type';

export default Vue.extend({
    name: 'Callback',
    mounted() {
        this.$nextTick(() => {
            this.$auth.handleAuthentication().then(() => {
                this.$store.dispatch(FETCH_USER_PROFILE).then(() => {
                    window.location.href = '/servers';
                });
            });
        });
    },
});
</script>
