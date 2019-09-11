import {DELETE_LEVEL_NAMES, FETCH_LEVEL_NAMES} from './actions.type';
import {
    DELETE_LEVEL_NAMES_END,
    DELETE_LEVEL_NAMES_START,
    FETCH_LEVEL_NAMES_END,
    FETCH_LEVEL_NAMES_START,
} from './mutations.type';
import {deleteWatchedLevel, getWatchedLevels} from '@/utils/api/levels';
import {getAccessToken} from '@/plugins/auth0';
import ApiResponse from '@/models/ApiResponse';
import { AxiosResponse } from 'axios';

class State {
    public loadingLevelNames: boolean = true;
    public levelNames: string[] = [];
    public levelNamesCount: number = -1;
}

const moduleState = new State();

const getters = {
    loadingLevelNames(state: State) {
        return state.loadingLevelNames;
    },
    levelNames(state: State) {
        return state.levelNames;
    },
    levelNamesCount(state: State) {
        return state.levelNamesCount;
    },
};

const actions = {
    async [FETCH_LEVEL_NAMES]({ commit }: any) {
        commit(FETCH_LEVEL_NAMES_START);
        return getWatchedLevels().then((data: AxiosResponse<ApiResponse>) => {
            commit(FETCH_LEVEL_NAMES_END, data);
        }).catch((err) => {
            if (err.code === 401) {
                getAccessToken();
            }
        });
    },
    async [DELETE_LEVEL_NAMES]({ dispatch, commit }: any, params: any) {
        commit(DELETE_LEVEL_NAMES_START);
        return deleteWatchedLevel(params.name).then((data: AxiosResponse<ApiResponse>) => {
            commit(DELETE_LEVEL_NAMES_END, data);
            dispatch(FETCH_LEVEL_NAMES);
        }).catch((err) => {
            if (err.code === 401) {
                getAccessToken();
            }
        });
    },
};

const mutations = {
    [FETCH_LEVEL_NAMES_START](state: State) {
        state.loadingLevelNames = true;
    },
    [FETCH_LEVEL_NAMES_END](state: State, resp: ApiResponse) {
        state.levelNames = resp.body;
        state.levelNamesCount = resp.body.length;
        state.loadingLevelNames = false;
    },
    [DELETE_LEVEL_NAMES_START](state: State) {
        state.loadingLevelNames = true;
    },
    [DELETE_LEVEL_NAMES_END](state: State, resp: ApiResponse) {
        state.loadingLevelNames = false;
    },
};

export default {
    state: moduleState,
    getters,
    actions,
    mutations,
};
