import { AxiosError } from 'axios'
import { FETCH_USER_PROFILE, CHANGE_USER_0AUTH_PROFILE } from './actions.type'
import { FETCH_USER_PROFILE_END, FETCH_USER_PROFILE_START, SET_USER_0AUTH_PROFILE } from './mutations.type'
import ApiResponse from '@/plugins/Repository/ApiResponse'
import { DefaultAuth0Profile } from '@/models/api/users/auth0'
import Profile from '@/models/api/users/profile'

class State {
    public userProfile: Profile = new Profile();
    public isUserProfileLoading: boolean = true;
}

const moduleState = () => new State()

const getters = {
  userProfile (state: State): Profile {
    return state.userProfile
  },
  isUserProfileLoading (state: State): Boolean {
    return state.isUserProfileLoading
  }
}

const actions = {
  [FETCH_USER_PROFILE] ({ commit }: any): any {
    commit(FETCH_USER_PROFILE_START)
    return this.$repositories.user.getUserProfile().then((data: any) => {
      commit(FETCH_USER_PROFILE_END, data)
    }).catch((err: AxiosError) => {
      console.log(err)
    })
  },
  [CHANGE_USER_0AUTH_PROFILE] ({ commit }: any, params: DefaultAuth0Profile) {
    commit(SET_USER_0AUTH_PROFILE, params)
  }
}

const mutations = {
  [FETCH_USER_PROFILE_START] (state: State) {
    state.isUserProfileLoading = true
  },
  [FETCH_USER_PROFILE_END] (state: State, resp: ApiResponse) {
    if (resp.body !== null) {
      state.userProfile.uuid = resp.body.uuid
      state.userProfile.isSubscribed = resp.body.isSubscribed
      state.userProfile.dateExpires = resp.body.dateExpires || 0
    }
    state.isUserProfileLoading = false
  },
  [SET_USER_0AUTH_PROFILE] (state: State, resp: DefaultAuth0Profile) {
    state.userProfile.oauthProfile = resp
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
