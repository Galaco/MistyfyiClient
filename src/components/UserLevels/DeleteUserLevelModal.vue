<template>
    <transition name="modal-fade">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <header class="modal-header">
                            <slot name="header">
                                <h5 class="modal-title">Delete Watched Map</h5>
                                <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                            </slot>
                        </header>
                        <section class="modal-body" id="modalDescription">
                            <slot name="body">
                                <p>Are you sure you want to delete this watched map? This action cannot be undone.</p>
                            </slot>
                        </section>
                        <footer class="modal-footer">
                            <slot name="footer">
                                <button type="button" class="btn btn-danger" @click="submit" aria-label="Save modal">
                                    <i class="material-icons btn-icon">delete</i>
                                    <span>Delete</span>
                                </button>
                                <button type="button" class="btn btn-secondary" @click="close" aria-label="Close modal">
                                    <i class="material-icons btn-icon">cancel</i>
                                    <span>Cancel</span>
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

<style>
    .modal {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;
    }

    .modal-title {
        line-height: 2rem;
    }
</style>
