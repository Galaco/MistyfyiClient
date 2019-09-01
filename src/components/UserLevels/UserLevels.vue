<template>
    <div class="level-list">
        <md-card class="md-elevation-6">
            <md-table>
                <md-table-toolbar>
                    <h1 class="md-title">{{ $t('servers.mapNames.title') }}</h1>
                    <md-button class="md-primary" @click="showAddModal()" id="addMapNameButton">
                        <i class="material-icons btn-icon">note_add</i>
                        <span>{{ $t('servers.mapNames.buttons.add') }}</span>
                    </md-button>
                </md-table-toolbar>
                <md-table-row>
                    <md-table-head class="v-center">Map Name</md-table-head>
                    <md-table-head class="controls">{{ $t('table.headers.actions') }}</md-table-head>
                </md-table-row>
                <md-table-row v-for="(level,index) in levelNames" :key="index">
                    <md-table-cell class="v-center">{{ level.name }}</md-table-cell>
                    <md-table-cell class="controls">
                        <md-button class="md-accent" @click="showDeleteModal(level)">
                            <i class="material-icons btn-icon">delete</i>
                            <span>{{ $t('servers.mapNames.buttons.delete') }}</span>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <div class="row" v-if="levelNamesCount === 0">
                <div class="col-sm-12 table-row-placeholder">{{ $t('servers.mapNames.noItems') }}</div>
            </div>
            <div class="row text-center" v-if="levelNamesCount === -1">
                <div class="col-sm-12 loading-spinner">
                    <MoonLoader/>
                </div>
            </div>
        </md-card>
        <AddUserLevelModal
                v-bind:show="isAddModalVisible"
                @close="closeAddModal"
                @confirm="addLevel"/>
        <DeleteUserLevelModal
                v-bind:show="isDeleteModalVisible"
                @close="closeDeleteModal"
                @confirm="deleteLevel"/>
    </div>
</template>

<script>
    import DeleteUserLevelModal from "./DeleteUserLevelModal";
    import AddUserLevelModal from "./AddUserLevelModal";
    import {DELETE_LEVEL_NAMES, FETCH_LEVEL_NAMES} from "../../store/actions.type";
    import { mapGetters } from "vuex";
    import {addWatchedLevel} from "../../utils/levels-api";
    import MoonLoader from 'vue-spinner/src/MoonLoader.vue';

    export default {
        name: "UserLevels",
        components: {
            DeleteUserLevelModal,
            AddUserLevelModal,
            MoonLoader,
        },
        methods: {
            getUserLevels() {
                this.$store.dispatch(FETCH_LEVEL_NAMES).catch((err) => {
                    this.$toasted.global.api_error({
                        message : err.response.data.message
                    });
                });
            },
            showAddModal() {
                this.isAddModalVisible = true;
            },
            closeAddModal() {
                this.isAddModalVisible = false;
            },
            addLevel(name) {
                addWatchedLevel(name).then(() => {
                    this.$toasted.global.api_success({
                        message : `Now watching level: ${name}`
                    });
                    this.closeAddModal();
                    this.getUserLevels();
                }).catch((err) => {
                    this.$toasted.global.api_error({
                        message : err.response.data.message
                    });
                });
            },
            showDeleteModal(level) {
                this.isDeleteModalVisible = true;
                this.selectedLevel = level;
            },
            closeDeleteModal() {
                this.isDeleteModalVisible = false;
                this.selectedLevel = null;
            },
            deleteLevel() {
                if (this.selectedLevel === null) {
                    return;
                }

                this.$store.dispatch(DELETE_LEVEL_NAMES, this.selectedLevel).then(() => {
                    this.$toasted.global.api_success({
                        message : `Successfully deleted watch name: ${this.selectedLevel.name}`
                    });
                    this.closeDeleteModal();
                    this.getUserLevels();
                }).catch((err) => {
                    this.$toasted.global.api_error({
                        message : err.response.data.message
                    });
                });
            },
        },
        data() {
            return {
                isAddModalVisible: false,
                selectedLevel: null,
                isDeleteModalVisible: false,
            };
        },
        mounted() {
            this.getUserLevels();
        },
        computed: {
            ...mapGetters(["levelNames", "levelNamesCount"]),
        }
    }

</script>

<style scoped>
    th.v-center, td.v-center {
        vertical-align: middle;
    }

    td.controls, th.controls {
        text-align: right;
    }

    .table-row-placeholder {
        height: 5rem;
        text-align: center;
        padding: 15px 0;
    }

    .loading-spinner {
        height: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
