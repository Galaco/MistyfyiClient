import {FETCH_SERVER_HISTORY, SELECT_SERVER} from "./actions.type";
import {FETCH_SERVER_HISTORY_END, FETCH_SERVER_HISTORY_START, SELECT_SERVER_END} from "./mutations.type";
import {getServerHistory} from "../utils/server-api";
import {login} from "../utils/auth";


const state = {
    serverSelected: null,
    history: [],
    isServerHistoryLoading: true,
    historyCount: -1,
};

const getters = {
    serverSelected(state) {
        return state.serverSelected;
    },
    history(state) {
        return state.history;
    },
    historyCount(state) {
        return state.historyCount;
    },
    isServerHistoryLoading(state) {
        return state.isServerHistoryLoading;
    }
};

const actions = {
    [FETCH_SERVER_HISTORY]({ commit }, params) {
        commit(FETCH_SERVER_HISTORY_START);
        return getServerHistory(params)
            .then(({ data }) => {
                commit(FETCH_SERVER_HISTORY_END, data.body);
            }).catch(({ data }) => {
                if (data.code === 401) {
                    login();
                }
                commit(FETCH_SERVER_HISTORY_END, data);
            });
    },
    [SELECT_SERVER]({ commit }, params) {
        commit(SELECT_SERVER_END, params);
    }
};

const mutations = {
    [FETCH_SERVER_HISTORY_START](state) {
        state.isLoading = true;
    },
    [FETCH_SERVER_HISTORY_END](state, history) {
        state.history = history;
        state.historyCount = history.length;
        state.isLoading = false;
    },
    [SELECT_SERVER_END](state, server) {
        state.serverSelected = server;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
