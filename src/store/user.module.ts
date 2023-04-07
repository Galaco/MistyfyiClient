import { AxiosError } from "axios"
import {FETCH_USER_PROFILE, CHANGE_USER_0AUTH_PROFILE, AUTH_STATE_CHANGED_ACTION, INIT_USER} from "./actions.type"
import {
  AUTH_STATE_CHANGED_END,
  FETCH_USER_PROFILE_END,
  FETCH_USER_PROFILE_START, SET_USER,
  SET_USER_0AUTH_PROFILE,
} from "./mutations.type"
import ApiResponse from "@/plugins/Repository/ApiResponse"
import { DefaultAuth0Profile } from "@/models/api/users/auth0"
import Profile from "@/models/api/users/profile"

class State {
  public userProfile: Profile = new Profile()
  public isUserProfileLoading: boolean = true
  public authUser: any;
}

const moduleState = () => new State()

const getters = {
  userProfile(state: State): Profile {
    return state.userProfile
  },
  isUserProfileLoading(state: State): Boolean {
    return state.isUserProfileLoading
  },
}

const actions = {
  async [INIT_USER]({ dispatch, commit }: any, { res }: any) {
    if (res && res.locals && res.locals.user) {
      const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

      commit(AUTH_STATE_CHANGED_END, { authUser, claims, token })
    }
  },
  [FETCH_USER_PROFILE]({ commit }: any): any {
    commit(FETCH_USER_PROFILE_START)
    console.log(this);
    // @ts-ignore this isn't undefined, but don't know how to type it.
    return this.$repositories.user
      .getUserProfile()
      .then((data: ApiResponse) => {
        commit(FETCH_USER_PROFILE_END, data)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  },
  [CHANGE_USER_0AUTH_PROFILE]({ commit }: any, params: DefaultAuth0Profile) {
    commit(SET_USER_0AUTH_PROFILE, params)
  },
  async [AUTH_STATE_CHANGED_ACTION]({ commit, dispatch }: any, { authUser, claims, token }: any) {
    if (!authUser) {
      await dispatch('cleanupAction')

      return
    }

    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    commit(SET_USER, {
      uid,
      email,
      emailVerified,
      displayName,
      photoURL, // results in photoURL being undefined for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim,
      token,
    })
  }
}

const mutations = {
  [FETCH_USER_PROFILE_START](state: State) {
    state.isUserProfileLoading = true
  },
  [FETCH_USER_PROFILE_END](state: State, resp: ApiResponse) {
    if (resp.body !== null) {
      state.userProfile.uuid = resp.body.uuid
      state.userProfile.isSubscribed = resp.body.isSubscribed
      state.userProfile.dateExpires = resp.body.dateExpires || 0
    }
    state.isUserProfileLoading = false
  },
  [SET_USER_0AUTH_PROFILE](state: State, resp: DefaultAuth0Profile) {
    state.userProfile.oauthProfile = resp
  },
  [SET_USER](state: State, {
    uid,
    email,
    emailVerified,
    displayName,
    isAdmin,
    token,
  }: any) {
    state.authUser = {
      uid,
      email,
      emailVerified,
      displayName,
      isAdmin,
      token,
    }
  },
  [AUTH_STATE_CHANGED_END](state: State, { authUser, claims, token }: any) {
    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    state.authUser = {
      uid,
      displayName,
      email,
      emailVerified,
      photoURL: photoURL || null, // results in photoURL being null for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim,
      token,
    }
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
}
