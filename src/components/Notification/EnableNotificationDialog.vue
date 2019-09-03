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

<script lang="ts">
import Vue from 'vue';
import {enableNotifications} from '../../utils/notify';
import { mapGetters } from 'vuex';

export default Vue.extend({
    name: 'EnableNotifications',
    props: {
        show: Boolean,
    },
    methods: {
        submit() {
            enableNotifications(this.userProfile.uuid);
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
