<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="alert alert-primary" role="alert" v-show="userProfile.isSubscribed == false">
                        {{ $t('servers.servers.instructions.free') }}
                    </div>
                    <div class="alert alert-primary" role="alert" v-show="userProfile.isSubscribed == true">
                        {{ $t('servers.servers.instructions.paid') }}
                    </div>
                </div>
            </div>
        </div>
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
