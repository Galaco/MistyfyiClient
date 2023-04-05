import { AxiosResponse, AxiosError } from "axios"
import { DELETE_SERVER, FETCH_SERVERS, SERVER_UPDATED } from "./actions.type"
import {
  FETCH_SERVERS_END,
  FETCH_SERVERS_START,
  DELETE_SERVERS_START,
  DELETE_SERVERS_END,
  SERVER_MAP_CHANGED,
} from "./mutations.type"
import ApiResponse from "@/plugins/Repository/ApiResponse"
import Server from "@/models/api/servers/Server"
import { ActionTree } from 'vuex';

class State {
  public servers: Server[] = []
  public isServersLoading: boolean = true
  public serversCount: number = -1
}

const moduleState = () => new State()

const getters = {
  servers(state: State) {
    return state.servers
  },
  serversCount(state: State) {
    return state.serversCount
  },
  isServersLoading(state: State) {
    return state.isServersLoading
  },
}

const actions: ActionTree<State, State> = {
  [FETCH_SERVERS]({ commit }: any): any {
    commit(FETCH_SERVERS_START)
    // @ts-ignore this isn't undefined, but don't know how to type it.
    return this.$repositories.servers
      .getServerStatuses()
      .then((data: AxiosResponse<ApiResponse>) => {
        commit(FETCH_SERVERS_END, data)
      })
      .catch((err: AxiosError) => {
        // @ts-ignore this isn't undefined, but don't know how to type it.
        this.$toast.error(err.message)
        console.log(err)
      })
  },
  [DELETE_SERVER](
    { dispatch, commit }: any,
    params: any
  ): Promise<ApiResponse> {
    commit(DELETE_SERVERS_START)
    // @ts-ignore this isn't undefined, but don't know how to type it.
    return this.$repositories.servers
      .deleteServer(params.ipAddress, params.port)
      .then((data: AxiosResponse<ApiResponse>) => {
        commit(DELETE_SERVERS_END, data)
        dispatch(FETCH_SERVERS)
      })
      .catch((err: AxiosError) => {
        // @ts-ignore this isn't undefined, but don't know how to type it.
        this.$toast.error(err.message)
        console.log(err)
      })
  },
  [SERVER_UPDATED]({ commit }: any, model: Server): void {
    commit(SERVER_MAP_CHANGED, model)
  },
}

const mutations = {
  [FETCH_SERVERS_START](state: State) {
    state.isServersLoading = true
  },
  [FETCH_SERVERS_END](state: State, resp: ApiResponse) {
    state.servers = resp.body.map(
      (item: any) =>
        new Server(
          item.id,
          item.ipAddress,
          item.port,
          item.name,
          item.currentMap,
          item.game,
          item.playerCount,
          item.maxPlayers,
          item.lastUpdated
        )
    )
    state.serversCount = resp.body.length
    state.isServersLoading = false
  },
  [DELETE_SERVERS_START](state: State) {
    state.isServersLoading = true
  },
  [DELETE_SERVERS_END](state: State) {
    state.isServersLoading = false
  },
  [SERVER_MAP_CHANGED](state: State, model: Server) {
    const idx = state.servers.findIndex(server => server.id === model.id)
    const servers = [...state.servers]
    servers[idx].name = model.name
    servers[idx].currentMap = model.currentMap
    servers[idx].lastUpdated = model.lastUpdated
    state.servers = servers
    state.isServersLoading = false
  },
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations,
}
