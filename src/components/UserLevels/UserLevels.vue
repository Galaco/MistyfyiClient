<template>
    <div class="container">
        <div class="row header">
            <div class="col-md-12">
                <h3>Watched Map Names</h3>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col" class="v-center">Watch Value</th>
                        <th scope="col" class="controls">
                            <button type="button" class="btn btn-primary" @click="showAddModal()">
                                <i class="material-icons btn-icon">note_add</i>
                                <span>Add watch name</span>
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
                                <span>Delete</span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
    import {addWatchedLevel} from "../../utils/servers-api";

    export default {
        name: "UserLevels",
        components: {
            DeleteUserLevelModal,
            AddUserLevelModal,
        },
        methods: {
            getUserLevels() {
                this.$store.dispatch(FETCH_LEVEL_NAMES).catch((data) => {
                    this.$toasted.show(`An error occurred: ${data.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
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
                    this.$toasted.show(`Now watching level ${name}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'success'
                    });
                    this.closeAddModal();
                }).catch((body) => {
                    this.$toasted.show(`An error occurred: ${body.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
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
                    this.closeDeleteModal();
                    this.getUserLevels();
                }).catch((data) => {
                    this.$toasted.show(`An error occurred: ${data.message}`, {
                        position: 'top-center',
                        duration: 5000,
                        fullWidth: true,
                        fitToScreen: true,
                        type: 'error'
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
    .row.header {
        text-align: left;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: solid 1px #EFEFEF;
    }

    th.v-center, td.v-center {
        vertical-align: middle;
    }

    td.controls, th.controls {
        text-align: right;
    }
</style>
