import {FETCH_USER_PROFILE} from "./actions.type";
import {FETCH_USER_PROFILE_END, FETCH_USER_PROFILE_START} from "./mutations.type";
import {reauthenticate} from "../utils/auth";
import {getUserProfile} from "../utils/user-api";


const state = {
    userProfile: {},
    isUserProfileLoading: true,
};

const getters = {
    userProfile(state) {
        return state.userProfile;
    },
    isUserProfileLoading(state) {
        return state.isUserProfileLoading;
    }
};

const actions = {
    [FETCH_USER_PROFILE]({ commit }, params) {
        commit(FETCH_USER_PROFILE_START);
        return getUserProfile(params)
            .then(({ data }) => {
                commit(FETCH_USER_PROFILE_END, data.body);
            }).catch(({ data }) => {
                if (data.code === 401) {
                    reauthenticate();
                }
                commit(FETCH_USER_PROFILE_END, data);
            });
    }
};

const mutations = {
    [FETCH_USER_PROFILE_START](state) {
        state.isUserProfileLoading = true;
    },
    [FETCH_USER_PROFILE_END](state, profile) {
        state.userProfile = profile;
        state.isUserProfileLoading = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
