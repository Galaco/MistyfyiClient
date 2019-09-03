import {FETCH_USER_PROFILE} from './actions.type';
import {FETCH_USER_PROFILE_END, FETCH_USER_PROFILE_START} from './mutations.type';
import {reauthenticate} from './../utils/auth';
import {getUserProfile} from './../utils/user-api';


class State {
    public userProfile: any = {};
    public isUserProfileLoading: boolean = true;
}

const moduleState = new State();

const getters = {
    userProfile(state: State) {
        return state.userProfile;
    },
    isUserProfileLoading(state: State) {
        return state.isUserProfileLoading;
    },
};

const actions = {
    [FETCH_USER_PROFILE]({ commit }: any) {
        commit(FETCH_USER_PROFILE_START);
        return getUserProfile()
            .then(({ data }: any) => {
                commit(FETCH_USER_PROFILE_END, data.body);
            }).catch((err: any) => {
                const body = err.response.data;
                if (body.code === 401) {
                    reauthenticate();
                }
            });
    },
};

const mutations = {
    [FETCH_USER_PROFILE_START](state: State) {
        state.isUserProfileLoading = true;
    },
    [FETCH_USER_PROFILE_END](state: State, profile: any) {
        state.userProfile = profile;
        state.isUserProfileLoading = false;
    },
};

export default {
    state: moduleState,
    getters,
    actions,
    mutations,
};
