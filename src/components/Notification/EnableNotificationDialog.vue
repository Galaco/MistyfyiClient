<template>
    <md-dialog :md-active="show" id="enableNotificationsDialog" @md-clicked-outside="close">
        <md-dialog-title>{{ $t('dialog.notifications.title') }}</md-dialog-title>
        <md-dialog-content>
            {{ $t('dialog.notifications.body') }}
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="submit">{{ $t('dialog.notifications.confirm') }}</md-button>
            <md-button class="md-secondary" @click="close">{{ $t('dialog.notifications.deny') }}</md-button>
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
            this.$emit('deny');
        },
        close() {
            this.$emit('deny');
        },
    },
    computed: {
        ...mapGetters(['userProfile']),
    },
});
</script>
