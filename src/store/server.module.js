import {FETCH_SERVER_HISTORY} from "./actions.type";
import {FETCH_SERVER_HISTORY_END, FETCH_SERVER_HISTORY_START} from "./mutations.type";
import {getServerHistory} from "../utils/server-api";
import {login} from "../utils/auth";


const state = {
    history: [],
    isServerHistoryLoading: true,
    historyCount: -1,
};

const getters = {
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
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
