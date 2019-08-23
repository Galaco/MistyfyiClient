<template>
    <transition name="modal-fade">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <header class="modal-header">
                            <slot name="header">
                                <h5 class="modal-title">{{ $t('servers.servers.modals.delete.title') }}</h5>
                                <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                            </slot>
                        </header>
                        <section class="modal-body" id="modalDescription">
                            <slot name="body">
                                <p>{{ $t('servers.servers.modals.delete.body') }}</p>
                            </slot>
                        </section>
                        <footer class="modal-footer">
                            <slot name="footer">
                                <button type="button" class="btn btn-danger" @click="submit" aria-label="Save modal">
                                    <i class="material-icons btn-icon">delete</i>
                                    <span>{{ $t('modal.buttons.delete') }}</span>
                                </button>
                                <button type="button" class="btn btn-secondary" @click="close" aria-label="Close modal">
                                    <i class="material-icons btn-icon">cancel</i>
                                    <span>{{ $t('modal.buttons.cancel') }}</span>
                                </button>
                            </slot>
                        </footer>
                    </div>
                </div>
            </div>
    </transition>
</template>

<script>
    export default {
        name: 'modal',
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                this.$emit('confirm');
            },
        },
    };
</script>
