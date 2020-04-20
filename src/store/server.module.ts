import { AxiosResponse, AxiosError } from 'axios'
import { FETCH_SERVER_HISTORY, SELECT_SERVER } from './actions.type'
import {
  FETCH_SERVER_HISTORY_END,
  FETCH_SERVER_HISTORY_START,
  SELECT_SERVER_END
} from './mutations.type'
import ApiResponse from '@/plugins/Repository/ApiResponse'
import Server from '@/models/api/servers/Server'
import HistoryItem from '@/models/api/servers/Historyitem'

class State {
    public serverSelected?: Server = undefined;
    public history: HistoryItem[] = [];
    public isServerHistoryLoading: boolean = true;
    public historyCount: number = -1;
}

const moduleState = () => new State()

const getters = {
  serverSelected (state: State): Server | undefined {
    return state.serverSelected
  },
  history (state: State): HistoryItem[] {
    return state.history
  },
  historyCount (state: State): number {
    return state.historyCount
  },
  isServerHistoryLoading (state: State): boolean {
    return state.isServerHistoryLoading
  }
}

const actions = {
  [FETCH_SERVER_HISTORY] ({ commit }: any, params: any): Promise<ApiResponse> {
    commit(FETCH_SERVER_HISTORY_START)
    return this.$repositories.server.getServerHistory(params).then((data: AxiosResponse) => {
      commit(FETCH_SERVER_HISTORY_END, data)
    }).catch((err: AxiosError) => {
      console.log(err)
    })
  },
  [SELECT_SERVER] ({ commit }: any, params: Server) {
    commit(SELECT_SERVER_END, params)
  }
}

const mutations = {
  [FETCH_SERVER_HISTORY_START] (state: State) {
    state.isServerHistoryLoading = true
  },
  [FETCH_SERVER_HISTORY_END] (state: State, resp: ApiResponse) {
    state.history = resp.body.map((item: any) => new HistoryItem(item.map_name, item.dateCreated))
    state.historyCount = resp.body.length
    state.isServerHistoryLoading = false
  },
  [SELECT_SERVER_END] (state: State, server: Server) {
    state.serverSelected = server
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
