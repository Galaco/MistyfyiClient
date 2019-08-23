import {DELETE_LEVEL_NAMES, FETCH_LEVEL_NAMES} from "./actions.type";
import {
    DELETE_LEVEL_NAMES_END,
    DELETE_LEVEL_NAMES_START,
    FETCH_LEVEL_NAMES_END,
    FETCH_LEVEL_NAMES_START
} from "./mutations.type";
import {deleteWatchedLevel, getWatchedLevels} from "../utils/levels-api";
import {login} from "../utils/auth";


const state = {
    loadingLevelNames: true,
    levelNames: [],
    levelNamesCount: -1
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
            }).catch(({ data }) => {
                if (data.code === 401) {
                    login();
                }
                commit(FETCH_LEVEL_NAMES_END, data);
            });
    },
    [DELETE_LEVEL_NAMES]({ commit }, params) {
        commit(DELETE_LEVEL_NAMES_START);
        return deleteWatchedLevel(params.name)
            .then(({ data }) => {
                commit(DELETE_LEVEL_NAMES_END, data.body);
            }).catch(({ data }) => {
                if (data.code === 401) {
                    login();
                }
                commit(DELETE_LEVEL_NAMES_END, data);
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
    },
    [DELETE_LEVEL_NAMES_START](state) {
    },
    [DELETE_LEVEL_NAMES_END](state) {
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
