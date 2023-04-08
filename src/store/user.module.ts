import { AxiosError } from "axios"
import {FETCH_USER_PROFILE, AUTH_STATE_CHANGED_ACTION, INIT_USER, ID_TOKEN_CHANGED_ACTION} from "./actions.type"
import {
  AUTH_STATE_CHANGED_END,
  FETCH_USER_PROFILE_END,
  FETCH_USER_PROFILE_START, SET_USER,
} from "./mutations.type"
import ApiResponse from "@/plugins/Repository/ApiResponse"
import Profile from "@/models/api/users/profile"

class State {
  public userProfile: Profile = new Profile()
  public isUserProfileLoading: boolean = true
  public authUser: any;
  public idToken: string = '';
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

      console.log('INIT_USER', res.locals.user);

      commit(AUTH_STATE_CHANGED_END, { authUser, claims, token })
    }
  },
  [FETCH_USER_PROFILE]({ commit }: any): any {
    commit(FETCH_USER_PROFILE_START)
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
  async [ID_TOKEN_CHANGED_ACTION]({ commit, dispatch }: any, bar: any) {
    console.log('ID_TOKEN_CHANGED_ACTION', bar)
  },
  async [AUTH_STATE_CHANGED_ACTION]({ commit, dispatch }: any, { authUser, claims }: any) {
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
      idToken: authUser.getIdToken(false),
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
  [SET_USER](state: State, {
    uid,
    email,
    emailVerified,
    displayName,
    isAdmin,
    idToken,
  }: any) {
    state.authUser = {
      uid,
      email,
      emailVerified,
      displayName,
      isAdmin,
      idToken,
    }
  },
  [AUTH_STATE_CHANGED_END](state: State, { authUser, claims }: any) {
    // you can request additional fields if they are optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName, photoURL } = authUser

    console.log(authUser);

    state.authUser = {
      uid,
      displayName,
      email,
      emailVerified,
      photoURL: photoURL || null, // results in photoURL being null for server auth
      // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
      isAdmin: claims.custom_claim,
      idToken: '',
    }
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
}
