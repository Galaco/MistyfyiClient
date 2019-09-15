<template>
    <Add
        id="addMapNameDialog"
        :title="$t('servers.mapNames.dialogs.add.title')"
        @confirm="addWatchedMap"
        @deny="close"
        :show="show"
        :confirmDisabled="(!mapNameValid) || (mapNameValid && mapName === '') || sending"
        >
        <span v-show="userProfile.isSubscribed === true">{{ $t('servers.mapNames.dialogs.add.description.paid') }}</span>
        <span v-show="userProfile.isSubscribed === false">{{ $t('servers.mapNames.dialogs.add.description.free') }}</span>
        <form novalidate class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field :class="(!mapNameValid)? 'md-invalid': ''">
                    <label for="adduserlevel_name">{{ $t('servers.mapNames.dialogs.add.form.name') }}</label>
                    <md-input 
                        name="name" 
                        id="adduserlevel_name" 
                        v-model="mapName" 
                        required 
                        :disabled="sending"/>
                    <span class="md-helper-text" v-show="userProfile.isSubscribed === false">{{ $t('servers.mapNames.dialogs.add.form.nameHelperFree') }}</span>
                    <span class="md-helper-text" v-show="userProfile.isSubscribed === true">{{ $t('servers.mapNames.dialogs.add.form.nameHelperPaid') }}</span>
                    <span class="md-error">{{ $t('servers.mapNames.dialogs.add.form.nameError') }}</span>
                </md-field>
            </div>
        </form>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
    </Add>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import Add from '@/components/Dialogs/Add.vue';
import {addWatchedLevel} from '@/utils/api/levels';

const mapNameRegex = /^[a-zA-Z0-9-_%s]+$/;

export default Vue.extend({
    name: 'AddWatchedMap',
    components: {
        Add,
    },
    props: {
        show: Boolean,
    },
    data: () => ({
        mapName: '',
        mapNameValid: true,
        sending: false,
    }),
    methods: {
        close() {
            this.reset();
            this.$emit('deny');
        },
        submit() {
            this.$emit('confirm');
            this.reset();
        },
        reset() {
            this.sending = false;
            this.mapName = '';
            this.mapNameValid = true;
        },
        addWatchedMap() {
            const name = this.mapName;
            addWatchedLevel(name).then(() => {
                this.$toasted.global.api_success({
                    message: `Now watching for map: ${name}`,
                });
                this.sending = false;
                this.submit();
            }).catch((err) => {
                this.sending = false;
                this.$toasted.global.api_error({ message : err.message });
            });
        },
    },
    watch: {
        mapName(value) {
            this.mapNameValid = mapNameRegex.test(value);
        },
    },
    computed: {
        ...mapGetters(['userProfile']),
    },
});
</script>
