import {FETCH_USER_PROFILE, CHANGE_USER_0AUTH_PROFILE} from './actions.type';
import {FETCH_USER_PROFILE_END, FETCH_USER_PROFILE_START, SET_USER_0AUTH_PROFILE} from './mutations.type';
import {getAccessToken} from '@/plugins/auth0';
import { normalizeResponse } from '@/utils/api/transform';
import {getUserProfile} from '@/utils/api/user';
import ApiResponse from '@/models/ApiResponse';
import { Auth0Profile } from '@/models/api/users/auth0';
import Profile from '@/models/api/users/profile';


class State {
    public userProfile: Profile = new Profile();
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
    async [FETCH_USER_PROFILE]({ commit }: any) {
        commit(FETCH_USER_PROFILE_START);
        return getUserProfile().then((data) => {
            commit(FETCH_USER_PROFILE_END, data);
        }).catch((err) => {
            if (err.code === 401) {
                getAccessToken();
            }
        });
    },
    [CHANGE_USER_0AUTH_PROFILE]({ commit }: any, params: Auth0Profile) {
        commit(SET_USER_0AUTH_PROFILE, params);
    },
};

const mutations = {
    [FETCH_USER_PROFILE_START](state: State) {
        state.isUserProfileLoading = true;
    },
    [FETCH_USER_PROFILE_END](state: State, resp: ApiResponse) {
        if (resp.body !== null) {
            state.userProfile.uuid = resp.body.uuid;
            state.userProfile.isSubscribed = resp.body.isSubscribed;
        }
        state.isUserProfileLoading = false;
    },
    [SET_USER_0AUTH_PROFILE](state: State, resp: Auth0Profile) {
        state.userProfile.oauthProfile = resp;
    },
};

export default {
    state: moduleState,
    getters,
    actions,
    mutations,
};
