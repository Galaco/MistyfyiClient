<template>
    <div class="container level-list">
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col" class="v-center">{{ $t('servers.mapNames.title') }}</th>
                        <th scope="col" class="controls">
                            <button type="button" class="btn btn-primary" @click="showAddModal()">
                                <i class="material-icons btn-icon">note_add</i>
                                <span>{{ $t('servers.mapNames.buttons.add') }}</span>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(level,index) in levelNames" :key="index">
                        <td class="v-center">{{ level.name }}</td>
                        <td class="controls">
                            <button type="button" class="btn btn-danger" @click="showDeleteModal(level)">
                                <i class="material-icons btn-icon">delete</i>
                                <span>{{ $t('servers.mapNames.buttons.delete') }}</span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="row" v-if="levelNamesCount === 0">
                    <div class="col-sm-12 table-row-placeholder">{{ $t('servers.mapNames.noItems') }}</div>
                </div>
                <div class="row text-center" v-if="levelNamesCount === -1">
                    <div class="col-sm-12 loading-spinner">
                        <MoonLoader/>
                    </div>
                </div>
            </div>
        </div>
        <AddUserLevelModal
                v-show="isAddModalVisible"
                @close="closeAddModal"
                @confirm="addLevel"/>
        <DeleteUserLevelModal
                v-show="isDeleteModalVisible"
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
