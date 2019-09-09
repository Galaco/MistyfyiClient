import {DELETE_LEVEL_NAMES, FETCH_LEVEL_NAMES} from './actions.type';
import {
    DELETE_LEVEL_NAMES_END,
    DELETE_LEVEL_NAMES_START,
    FETCH_LEVEL_NAMES_END,
    FETCH_LEVEL_NAMES_START,
} from './mutations.type';
import {deleteWatchedLevel, getWatchedLevels} from '@/utils/api/levels';
import { normalizeResponse } from '@/utils/api/transform';
import {getAccessToken} from '@/plugins/auth0';

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
    [FETCH_LEVEL_NAMES]({ commit }: any) {
        commit(FETCH_LEVEL_NAMES_START);
        return getWatchedLevels()
            .then(({ data }: any) => {
                commit(FETCH_LEVEL_NAMES_END, data.body);
            }).catch((err: any) => {
                const resp = normalizeResponse(err, []);
                if (resp.code === 401) {
                    getAccessToken();
                }
                commit(FETCH_LEVEL_NAMES_END, resp.body);
            });
    },
    [DELETE_LEVEL_NAMES]({ commit }: any, params: any) {
        commit(DELETE_LEVEL_NAMES_START);
        return deleteWatchedLevel(params.name)
            .then(({ data }: any) => {
                commit(DELETE_LEVEL_NAMES_END, data.body);
            }).catch((err: any) => {
                const resp = normalizeResponse(err);
                if (resp.code === 401) {
                    getAccessToken();
                }
                commit(DELETE_LEVEL_NAMES_END, resp.body);
            });
    },
};

const mutations = {
    [FETCH_LEVEL_NAMES_START](state: State) {
        state.loadingLevelNames = true;
    },
    [FETCH_LEVEL_NAMES_END](state: State, levelNames: any) {
        state.levelNames = levelNames;
        state.levelNamesCount = levelNames.length;
        state.loadingLevelNames = false;
    },
    [DELETE_LEVEL_NAMES_START](state: State) {
        state.loadingLevelNames = true;
    },
    [DELETE_LEVEL_NAMES_END](state: State) {
        state.loadingLevelNames = false;
    },
};

export default {
    state: moduleState,
    getters,
    actions,
    mutations,
};
