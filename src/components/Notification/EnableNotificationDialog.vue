<template>
    <md-dialog :md-active="show" id="enableNotificationsDialog" @md-clicked-outside="close">
        <md-dialog-title>{{ $t('dialog.notifications.title') }}</md-dialog-title>
        <md-dialog-content>
            {{ $t('dialog.notifications.body') }}
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="submit">{{ $t('dialog.notifications.confirm') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('dialog.notifications.deny') }}</md-button>
            <md-button class="md-secondary" @click="closeForever">{{ $t('dialog.notifications.denyForever') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export const NEVER_SHOW_DIALOG = 'hideNotificationDialog';

export default Vue.extend({
    name: 'EnableNotifications',
    props: {
        show: Boolean,
    },
    methods: {
        submit() {
            this.$pushbots.requestNotificationsPermission((data) => {
                this.$pushbots.setEmail(this.$auth.user.email);
                this.$pushbots.setAlias(this.userProfile.uuid);
            });
            this.close();
        },
        close() {
            this.$emit('deny');
        },
        closeForever() {
            this.$localStorage.set(NEVER_SHOW_DIALOG, true);
            this.$emit('deny');
        },
    },
    computed: {
        ...mapGetters(['userProfile']),
    },
});
</script>
