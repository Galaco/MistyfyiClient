<template>
    <md-dialog :md-active="show" id="enableNotificationsDialog" @md-clicked-outside="close">
        <md-dialog-title>Enable Notifications</md-dialog-title>
        <md-dialog-content>
            Enabling notifications will allow MapTracker to send you a message whenever a map on your watch list begins on a server you are watching.
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="submit">Allow</md-button>
            <md-button class="md-secondary" @click="close">Don't Allow</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
    name: 'EnableNotifications',
    props: {
        show: Boolean,
    },
    methods: {
        submit() {
            this.$pushbots.requestNotificationsPermission();
            this.$pushbots.setEmail(this.$auth.user.email);
            this.$emit('close');
        },
        close() {
            this.$emit('close');
        },
    },
    computed: {
        ...mapGetters(['userProfile']),
    },
});
</script>
