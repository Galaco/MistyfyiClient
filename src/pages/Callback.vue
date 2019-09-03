<template>
    <span></span>
</template>

<script lang="ts">
import Vue from 'vue';
import {setAccessToken, setIdToken} from '../utils/auth';

export default Vue.extend({
    name: 'Callback',
    mounted() {
        this.$nextTick(() => {
            setAccessToken();
            setIdToken();
            window.location.href = '/servers';
        });
    },
});
</script>
