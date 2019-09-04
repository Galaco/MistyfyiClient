<template>
    <span></span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Callback',
    mounted() {
        this.$nextTick(() => {
            this.$auth.handleAuthentication().then(() => {
                window.location.href = '/servers';
            });
        });
    },
});
</script>
