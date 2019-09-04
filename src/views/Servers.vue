<template>
    <div>
        <md-card class="instructions">
            <div class="md-layout md-gutter md-primary">
                <div class="md-layout-item">
                    <span class="md-body-2" v-show="userProfile.isSubscribed === false">{{ $t('servers.servers.instructions.free') }}</span>
                    <span class="md-body-2" v-show="userProfile.isSubscribed === true">{{ $t('servers.servers.instructions.paid') }}</span>
                </div>
            </div>
        </md-card>

        <WatchedServers/>
        <WatchedMaps/>
        <EnableNotificationDialog
                v-bind:show="isEnableNotificationDialogVisible"
                @confirm="closeEnableNotificationsPopup"
                @close="closeEnableNotificationsPopup"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import WatchedServers from './../components/WatchedServers/WatchedServers.vue';
import EnableNotificationDialog from './../components/Notification/EnableNotificationDialog.vue';
import WatchedMaps from './../components/WatchedMaps/WatchedMaps.vue';
import {FETCH_USER_PROFILE, SET_USER_PROFILE} from '@/store/actions.type';
import {userInfo} from '@/plugins/auth0';

export default Vue.extend({
    name: 'Servers',
    components: {
        EnableNotificationDialog,
        WatchedServers,
        WatchedMaps,
    },
    data() {
        return {
            isEnableNotificationDialogVisible: false,
        };
    },
    methods: {
        closeEnableNotificationsPopup() {
            this.isEnableNotificationDialogVisible = false;
        },
    },
    mounted() {
        this.$store.dispatch(SET_USER_PROFILE, userInfo());
        this.$store.dispatch(FETCH_USER_PROFILE);
    },
    computed: {
        ...mapGetters(['userProfile']),
    },
});
</script>

<style lang="scss" scoped>
    .instructions {
        padding:16px;
        margin-bottom: 16px;
    }
</style>
