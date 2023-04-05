import { AxiosResponse, AxiosError } from "axios"
import { DELETE_LEVEL_NAMES, FETCH_LEVEL_NAMES } from "./actions.type"
import {
  DELETE_LEVEL_NAMES_END,
  DELETE_LEVEL_NAMES_START,
  FETCH_LEVEL_NAMES_END,
  FETCH_LEVEL_NAMES_START,
} from "./mutations.type"
import ApiResponse from "@/plugins/Repository/ApiResponse"
import WatchedMap from "~/models/api/maps/WatchedMap"

class State {
  public loadingLevelNames: boolean = true
  public levelNames: WatchedMap[] = []
  public levelNamesCount: number = -1
}

const moduleState = () => new State()

const getters = {
  loadingLevelNames(state: State) {
    return state.loadingLevelNames
  },
  levelNames(state: State) {
    return state.levelNames
  },
  levelNamesCount(state: State) {
    return state.levelNamesCount
  },
}

const actions = {
  [FETCH_LEVEL_NAMES]({ commit }: any): Promise<ApiResponse> {
    commit(FETCH_LEVEL_NAMES_START)
    // @ts-ignore this isn't undefined, but don't know how to type it.
    return this.$repositories.levels
      .getWatchedLevels()
      .then((data: AxiosResponse<ApiResponse>) => {
        commit(FETCH_LEVEL_NAMES_END, data)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  },
  [DELETE_LEVEL_NAMES](
    { dispatch, commit }: any,
    params: WatchedMap
  ): Promise<ApiResponse> {
    commit(DELETE_LEVEL_NAMES_START)
    // @ts-ignore this isn't undefined, but don't know how to type it.
    return this.$repositories.levels
      .deleteWatchedLevel(params.id)
      .then((data: AxiosResponse<ApiResponse>) => {
        commit(DELETE_LEVEL_NAMES_END, data)
        dispatch(FETCH_LEVEL_NAMES)
      })
      .catch((err: AxiosError) => {
        console.log(err)
      })
  },
}

const mutations = {
  [FETCH_LEVEL_NAMES_START](state: State) {
    state.loadingLevelNames = true
  },
  [FETCH_LEVEL_NAMES_END](state: State, resp: ApiResponse) {
    state.levelNames = resp.body.map(
      (item: any) =>
        new WatchedMap(item.id, item.name, item.serverId, item.disabled)
    )
    state.levelNamesCount = resp.body.length
    state.loadingLevelNames = false
  },
  [DELETE_LEVEL_NAMES_START](state: State) {
    state.loadingLevelNames = true
  },
  [DELETE_LEVEL_NAMES_END](state: State) {
    state.loadingLevelNames = false
  },
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
}
