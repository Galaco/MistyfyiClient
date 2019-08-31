<template>
    <md-dialog class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <header class="modal-header">
                    <slot name="header">
                        <h5 class="modal-title">{{ $t('servers.mapNames.modals.add.title') }}</h5>
                        <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                    </slot>
                </header>
                <section class="modal-body" id="modalDescription">
                    <slot name="body">
                        <form method="POST">
                            <div class="form-group">
                                <label for="adduserlevel_name">{{ $t('servers.mapNames.modals.add.form.name') }}</label>
                                <input type="text" class="form-control" name="ip" id="adduserlevel_name" v-model="userLevelName" v-bind:placeholder="$t('servers.mapNames.modals.add.form.namePlaceholder')"/>
                            </div>
                        </form>
                    </slot>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-primary" @click="submit" aria-label="Save modal">
                            <i class="material-icons btn-icon">check</i>
                            <span>{{ $t('modal.buttons.save') }}</span>
                        </button>
                        <button type="button" class="btn btn-secondary" @click="close" aria-label="Close modal">
                            <i class="material-icons btn-icon">cancel</i>
                            <span>{{ $t('modal.buttons.cancel') }}</span>
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </md-dialog>
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
