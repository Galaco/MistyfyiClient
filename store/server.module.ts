import { AxiosResponse, AxiosError } from 'axios'
import { FETCH_SERVER_HISTORY, SELECT_SERVER } from './actions.type'
import { FETCH_SERVER_HISTORY_END, FETCH_SERVER_HISTORY_START, SELECT_SERVER_END } from './mutations.type'
import ApiResponse from '@/models/ApiResponse'

class State {
    public serverSelected: any = null;
    public history: any[] = [];
    public isServerHistoryLoading: boolean = true;
    public historyCount: number = -1;
}

const moduleState = new State()

const getters = {
  serverSelected (state: State) {
    return state.serverSelected
  },
  history (state: State) {
    return state.history
  },
  historyCount (state: State) {
    return state.historyCount
  },
  isServerHistoryLoading (state: State) {
    return state.isServerHistoryLoading
  }
}

const actions = {
  [FETCH_SERVER_HISTORY] ({ commit }: any, params: any): any {
    commit(FETCH_SERVER_HISTORY_START)
    return this.$repositories.server().getServerHistory(params).then((data: AxiosResponse) => {
      commit(FETCH_SERVER_HISTORY_END, data)
    }).catch((err: AxiosError) => {
      console.log(err)
    })
  },
  [SELECT_SERVER] ({ commit }: any, params: any) {
    commit(SELECT_SERVER_END, params)
  }
}

const mutations = {
  [FETCH_SERVER_HISTORY_START] (state: State) {
    state.isServerHistoryLoading = true
  },
  [FETCH_SERVER_HISTORY_END] (state: State, resp: ApiResponse) {
    state.history = resp.body
    state.historyCount = resp.body.length
    state.isServerHistoryLoading = false
  },
  [SELECT_SERVER_END] (state: State, server: any) {
    state.serverSelected = server
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
