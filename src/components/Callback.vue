<template>
    <span></span>
</template>

<script>
    import {setAccessToken, setIdToken} from '../utils/auth';
    export default {
        name: 'Callback',
        mounted() {
            this.$nextTick(() => {
                setAccessToken();
                setIdToken();
                this.$router.push('servers');
            });
        },
    }
</script>
