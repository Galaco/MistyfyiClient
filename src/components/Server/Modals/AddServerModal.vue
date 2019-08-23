<template>
    <transition name="modal-fade">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <header class="modal-header" id="addServerModalTitle">
                            <slot name="header">
                                <h5 class="modal-title">{{ $t('servers.servers.modals.add.title') }}</h5>
                                <button type="button" class="btn btn-danger btn-close" @click="close" aria-label="Close modal"><i class="material-icons btn-icon">close</i></button>
                            </slot>
                        </header>
                        <section class="modal-body" id="modalDescription">
                            <slot name="body">
                                <form method="POST">
                                    <div class="form-group">
                                        <label for="addserver_ip">{{ $t('servers.servers.modals.add.form.ip') }}</label>
                                        <input type="text" class="form-control" name="ip" id="addserver_ip" v-model="serverIP" v-bind:placeholder="$t('servers.servers.modals.add.form.ipPlaceholder')"/>
                                        </div>
                                    <div class="form-group">
                                        <label for="addserver_port">{{ $t('servers.servers.modals.add.form.port') }}</label>
                                        <input type="number" class="form-control" name="port" id="addserver_port" v-model="serverPort" v-bind:placeholder="$t('servers.servers.modals.add.form.portPlaceholder')"/>
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
    import {addNewServer} from '../../../utils/servers-api';

    export default {
        name: 'modal',
        data: () => {
            return {
                serverIP: '',
                serverPort: 0,
            }
        },
        methods: {
            close() {
                this.$emit('close');
            },
            submit() {
                addNewServer(this.serverIP, this.serverPort).then(() => {
                    this.$toasted.show(`Now watching server ${this.serverIP}:${this.serverPort}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'success'
                    });
                    this.reset();
                    this.$emit('confirm');
                }).catch((err) => {
                    this.$toasted.show(`An error occurred: ${err.response.data.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
                    });
                });
            },
            reset() {
                this.serverIP = '';
                this.serverPort = '';
            }
        },
    };
</script>
