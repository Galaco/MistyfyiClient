import {FETCH_SERVER_HISTORY, SELECT_SERVER} from './actions.type';
import {FETCH_SERVER_HISTORY_END, FETCH_SERVER_HISTORY_START, SELECT_SERVER_END} from './mutations.type';
import {getServerHistory} from '@/utils/api/server';
import { normalizeResponse } from '@/utils/api/transform';
import {getAccessToken} from '@/plugins/auth0';
import ApiResponse from '@/models/ApiResponse';
import { AxiosResponse } from 'axios';


class State {
    public serverSelected: any = null;
    public history: any[] = [];
    public isServerHistoryLoading: boolean = true;
    public historyCount: number = -1;
}

const moduleState = new State();

const getters = {
    serverSelected(state: State) {
        return state.serverSelected;
    },
    history(state: State) {
        return state.history;
    },
    historyCount(state: State) {
        return state.historyCount;
    },
    isServerHistoryLoading(state: State) {
        return state.isServerHistoryLoading;
    },
};

const actions = {
    async [FETCH_SERVER_HISTORY]({ commit }: any, params: any) {
        commit(FETCH_SERVER_HISTORY_START);
        return getServerHistory(params).then((data: AxiosResponse) => {
            commit(FETCH_SERVER_HISTORY_END, data);
        }).catch((err) => {
            if (err.code === 401) {
                getAccessToken();
            }
        });
    },
    [SELECT_SERVER]({ commit }: any, params: any) {
        commit(SELECT_SERVER_END, params);
    },
};

const mutations = {
    [FETCH_SERVER_HISTORY_START](state: State) {
        state.isServerHistoryLoading = true;
    },
    [FETCH_SERVER_HISTORY_END](state: State, resp: ApiResponse) {
        state.history = resp.body;
        state.historyCount = resp.body.length;
        state.isServerHistoryLoading = false;
    },
    [SELECT_SERVER_END](state: State, server: any) {
        state.serverSelected = server;
    },
};

export default {
    state: moduleState,
    getters,
    actions,
    mutations,
};
