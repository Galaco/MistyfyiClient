<template>
    <small class="text-muted">Updated {{ formatted }}</small>
</template>

<script>
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';

    export default {
        name: "LastUpdated",
        data() {
            return {
                formatted: '',
            }
        },
        props: {
           date: Number,
        },
        mounted() {
            TimeAgo.addLocale(en);
            this.formatted = new TimeAgo('en-US').format(new Date(this.date * 1000));
        },
        watch: {
            date: function() {
                this.formatted = new TimeAgo('en-US').format(new Date(this.date * 1000));
            }
        }
    }
</script>
