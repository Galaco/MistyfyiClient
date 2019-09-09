<template>
    <Add
        id="addMapNameDialog"
        :title="$t('servers.mapNames.dialogs.add.title')"
        @confirm="addWatchedMap"
        @deny="close"
        :show="show"
        :confirmDisabled="!mapNameValid"
        >
        <form novalidate class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                <md-field :class="(!mapNameValid)? 'md-invalid': ''">
                    <label for="adduserlevel_name">{{ $t('servers.mapNames.dialogs.add.form.name') }}</label>
                    <md-input name="name" id="adduserlevel_name" v-model="mapName" required/>
                    <span class="md-error">{{ $t('servers.mapNames.dialogs.add.form.nameError') }}</span>
                </md-field>
            </div>
        </form>
    </Add>
</template>

<script lang="ts">
import Vue from 'vue';
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
        mapNameValid: false,
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
            this.mapName = '';
        },
        addWatchedMap() {
            const name = this.mapName;
            addWatchedLevel(name).then(() => {
                this.$toasted.global.api_success({
                    message: `Now watching level: ${name}`,
                });
                this.submit();
            }).catch((err) => {
                this.$toasted.global.api_error({
                    message: err.response.data.message,
                });
            });
        },
    },
    watch: {
        mapName(value) {
            this.mapNameValid = mapNameRegex.test(value);
        },
    },
});
</script>
