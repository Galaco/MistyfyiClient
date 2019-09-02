<template>
    <div class="level-list">
        <md-card class="md-elevation-6">
            <md-table>
                <md-table-toolbar>
                    <h1 class="md-title">{{ $t('servers.mapNames.title') }}</h1>
                    <md-button class="md-primary" @click="showAddDialog()" id="addMapNameButton">
                        <i class="material-icons btn-icon">note_add</i>
                        <span>{{ $t('servers.mapNames.buttons.add') }}</span>
                    </md-button>
                </md-table-toolbar>
                <md-table-row v-if="levelNames.length > 0">
                    <md-table-head class="v-center">Map Name</md-table-head>
                    <md-table-head class="controls">{{ $t('table.headers.actions') }}</md-table-head>
                </md-table-row>
                <md-table-row v-for="(level,index) in levelNames" :key="index">
                    <md-table-cell class="v-center">{{ level.name }}</md-table-cell>
                    <md-table-cell class="controls">
                        <div class="md-layout md-alignment-center md-gutter">
                            <div class="md-layout-item md-size-40">
                                <md-button class="md-icon-button md-accent md-raised" @click="showDeleteDialog(level)">
                                    <md-icon>delete</md-icon>
                                    <md-tooltip md-direction="bottom">{{ $t('servers.mapNames.buttons.delete') }}</md-tooltip>
                                </md-button>
                            </div>
                        </div>
                    </md-table-cell>
                </md-table-row>
            </md-table>

            <md-empty-state
                    v-if="levelNamesCount === 0"
                    md-icon="create"
                    :md-label="$t('servers.mapNames.noItems.title')"
                    :md-description="$t('servers.mapNames.noItems.description')">
                <md-button class="md-primary md-raised" @click="showAddDialog()" id="addFirstMapNameButton">
                    <i class="material-icons btn-icon">note_add</i>
                    <span>{{ $t('servers.mapNames.noItems.add') }}</span>
                </md-button>
            </md-empty-state>
            <div class="row text-center" v-if="levelNamesCount === -1">
                <div class="col-sm-12 loading-spinner">
                    <MoonLoader/>
                </div>
            </div>
        </md-card>
        <AddUserLevelDialog
                v-bind:show="isAddDialogVisible"
                @close="closeAddDialog"
                @confirm="addLevel"/>
        <DeleteUserLevelDialog
                v-bind:show="isDeleteDialogVisible"
                @close="closeDeleteDialog"
                @confirm="deleteLevel"/>
    </div>
</template>

<script>
    import DeleteUserLevelDialog from "./Dialogs/DeleteWatchedMap";
    import AddUserLevelDialog from "./Dialogs/AddWatchedMap";
    import {DELETE_LEVEL_NAMES, FETCH_LEVEL_NAMES} from "../../store/actions.type";
    import { mapGetters } from "vuex";
    import {addWatchedLevel} from "../../utils/levels-api";
    import MoonLoader from 'vue-spinner/src/MoonLoader.vue';

    export default {
        name: "UserLevels",
        components: {
            DeleteUserLevelDialog,
            AddUserLevelDialog,
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
            showAddDialog() {
                this.isAddDialogVisible = true;
            },
            closeAddDialog() {
                this.isAddDialogVisible = false;
            },
            addLevel(name) {
                addWatchedLevel(name).then(() => {
                    this.$toasted.global.api_success({
                        message : `Now watching level: ${name}`
                    });
                    this.closeAddDialog();
                    this.getUserLevels();
                }).catch((err) => {
                    this.$toasted.global.api_error({
                        message : err.response.data.message
                    });
                });
            },
            showDeleteDialog(level) {
                this.isDeleteDialogVisible = true;
                this.selectedLevel = level;
            },
            closeDeleteDialog() {
                this.isDeleteDialogVisible = false;
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
                    this.closeDeleteDialog();
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
                isAddDialogVisible: false,
                selectedLevel: null,
                isDeleteDialogVisible: false,
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

<style scoped lang="scss">
    .md-table-toolbar {
        border-bottom: 1px solid #bbb;
    }

    .level-list {
        margin-bottom: 16px;
    }

    th.controls {
        text-align: center;
        width: 160px;
        min-width: 160px;
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
