<template>
    <div>
        <ServerList/>
        <UserLevels/>
        <EnableNotificationModal
                v-show="isEnableNotificationModalVisible"
                @confirm="closeEnableNotificationsPopup"
                @close="closeEnableNotificationsPopup"
        />
    </div>
</template>

<script>
    import ServerList from './Server/ServerList';
    import EnableNotificationModal from './Notification/EnableNotificationModal';
    import UserLevels from './UserLevels/UserLevels';
    import {shouldDisplayNotificationPopup} from "../utils/notify";
    import {FETCH_USER_PROFILE} from "../store/actions.type";

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

        }
    }
</script>
