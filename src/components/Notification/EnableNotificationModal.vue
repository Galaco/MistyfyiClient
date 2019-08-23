<template>
    <transition name="modal-fade">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <header class="modal-header">
                            <slot name="header">
                                <h5 class="modal-title">Enable Notifications</h5>
                                <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                            </slot>
                        </header>
                        <section class="modal-body" id="modalDescription">
                            <slot name="body">
                                <p>Enabling notifications will allow MapTracker to send you a message whenever a map on your watch list begins on a server you are watching.</p>
                            </slot>
                        </section>
                        <footer class="modal-footer">
                            <slot name="footer">
                                <button type="button" class="btn btn-primary" @click="confirm" aria-label="Close modal">
                                    <i class="material-icons btn-icon">check</i>
                                    <span>Allow</span>
                                </button>
                                <button type="button" class="btn btn-secondary" @click="close" aria-label="Close modal">
                                    <i class="material-icons btn-icon">cancel</i>
                                    <span>Don't allow</span>
                                </button>
                            </slot>
                        </footer>
                    </div>
                </div>
            </div>
    </transition>
</template>

<script>
    import {COOKIE_NOTIFICATION_POPUP_SEEN, enableNotifications} from "../../utils/notify";
    import { mapGetters } from "vuex";

    export default {
        name: 'modal',
        methods: {
            confirm() {
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
