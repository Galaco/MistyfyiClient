<template>
    <span>
        <span class="md-subheading" v-show="userProfile.isSubscribed === true">
                {{ $t('servers.servers.instructions.free') }}
            </span>
            <span class="md-subheading" v-show="userProfile.isSubscribed === false">
                {{ $t('servers.servers.instructions.paid') }}
            </span>
        <ServerList/>
        <UserLevels/>
        <EnableNotificationModal
                v-show="isEnableNotificationModalVisible"
                @confirm="closeEnableNotificationsPopup"
                @close="closeEnableNotificationsPopup"
        />
    </span>
</template>

<script>
    import ServerList from '../components/Server/ServerList';
    import EnableNotificationModal from '../components/Notification/EnableNotificationModal';
    import UserLevels from '../components/UserLevels/UserLevels';
    import {shouldDisplayNotificationPopup} from "../utils/notify";
    import {FETCH_USER_PROFILE} from "../store/actions.type";
    import { mapGetters } from "vuex";

    export default {
        name: 'Servers',
        components: {
            EnableNotificationModal,
            ServerList,
            UserLevels,
        },
        data() {
            return {
                isEnableNotificationModalVisible: false,
            };
        },
        methods: {
            closeEnableNotificationsPopup() {
                this.isEnableNotificationModalVisible = false;
            },
        },
        mounted() {
            this.$store.dispatch(FETCH_USER_PROFILE).then(() => {
                this.isEnableNotificationModalVisible = shouldDisplayNotificationPopup();
            });
        },
        computed: {
            ...mapGetters(["userProfile"]),
        }
    }
</script>
