<template>
    <md-dialog :md-active.sync="show" id="enableNotificationsDialog">
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

<script>
    import {COOKIE_NOTIFICATION_POPUP_SEEN, enableNotifications} from "../../utils/notify";
    import { mapGetters } from "vuex";

    export default {
        name: 'EnableNotifications',
        props: {
            show: Boolean,
        },
        methods: {
            submit() {
                this.$cookies.set(COOKIE_NOTIFICATION_POPUP_SEEN, true);
                enableNotifications(this.userProfile.uuid);
                this.$emit('close');
            },
            close() {
                this.$emit('close');
            },
        },
        computed: {
            ...mapGetters(["userProfile"]),
        }
    };
</script>
