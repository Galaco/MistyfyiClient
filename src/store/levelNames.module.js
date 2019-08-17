import {DELETE_LEVEL_NAMES, FETCH_LEVEL_NAMES} from "./actions.type";
import {FETCH_END, FETCH_LEVEL_NAMES_END, FETCH_LEVEL_NAMES_START, FETCH_START} from "./mutations.type";
import {deleteWatchedLevel, getWatchedLevels} from "../utils/servers-api";


const state = {
    loadingLevelNames: true,
    levelNames: [],
    levelNamesCount: 0
};

const getters = {
    loadingLevelNames(state) {
        return state.loadingLevelNames;
    },
    levelNames(state) {
        return state.levelNames;
    },
    levelNamesCount(state) {
        return state.levelNamesCount;
    },
};

const actions = {
    [FETCH_LEVEL_NAMES]({ commit }) {
        commit(FETCH_LEVEL_NAMES_START);
        return getWatchedLevels()
            .then(({ data }) => {
                commit(FETCH_LEVEL_NAMES_END, data.body);
            }).catch(() => {

            });
    },
    [DELETE_LEVEL_NAMES]({ commit }, params) {
        commit(FETCH_LEVEL_NAMES_START);
        return deleteWatchedLevel(params.name)
            .then(({ data }) => {
                commit(FETCH_LEVEL_NAMES_END, data.body);
            }).catch(() => {

            });
    }
};

const mutations = {
    [FETCH_LEVEL_NAMES_START](state) {
        state.loadingLevelNames = true;
    },
    [FETCH_LEVEL_NAMES_END](state, levelNames) {
        state.levelNames = levelNames;
        state.levelNamesCount = levelNames.length;
        state.loadingLevelNames = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
