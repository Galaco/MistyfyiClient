<template>
    <div>
        <div class="instructions">
            <md-card class="md-elevation-6">
                    <span class="md-subheading" v-show="userProfile.isSubscribed === false">
                        {{ $t('servers.servers.instructions.free') }}
                    </span>
                <span class="md-subheading" v-show="userProfile.isSubscribed === true">
                        {{ $t('servers.servers.instructions.paid') }}
                    </span>
            </md-card>
        </div>
        <WatchedServers/>
        <WatchedMaps/>
        <EnableNotificationDialog
                v-bind:show="isEnableNotificationDialogVisible"
                @confirm="closeEnableNotificationsPopup"
                @close="closeEnableNotificationsPopup"
        />
    </div>
</template>

<script>
    import WatchedServers from '../components/WatchedServers/WatchedServers';
    import EnableNotificationDialog from '../components/Notification/EnableNotificationDialog';
    import WatchedMaps from '../components/WatchedMaps/WatchedMaps';
    import {shouldDisplayNotificationPopup} from "../utils/notify";
    import {FETCH_USER_PROFILE} from "../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
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
            this.$store.dispatch(FETCH_USER_PROFILE).then(() => {
                this.isEnableNotificationDialogVisible = shouldDisplayNotificationPopup();
            });
        },
        computed: {
            ...mapGetters(["userProfile"]),
        }
    }
</script>

<style scoped>
    .instructions {
        margin-bottom: 16px;
    }
</style>
