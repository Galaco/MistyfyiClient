<template>
    <transition name="modal-fade">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <header class="modal-header">
                            <slot name="header">
                                <h5 class="modal-title">New Watched Map</h5>
                                <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                            </slot>
                        </header>
                        <section class="modal-body" id="modalDescription">
                            <slot name="body">
                                <form method="POST">
                                    <div class="form-group">
                                        <label for="adduserlevel_name">Map name:</label>
                                        <input type="text" class="form-control" name="ip" id="adduserlevel_name" v-model="userLevelName" placeholder="Map name"/>
                                    </div>
                                </form>
                            </slot>
                        </section>
                        <footer class="modal-footer">
                            <slot name="footer">
                                <button type="button" class="btn btn-primary" @click="submit" aria-label="Save modal">
                                    <i class="material-icons btn-icon">check</i>
                                    <span>Save</span>
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
        data: () => {
            return {
                userLevelName: '',
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                this.$emit('confirm', this.userLevelName);
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
