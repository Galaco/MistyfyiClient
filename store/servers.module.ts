import { AxiosResponse, AxiosError } from 'axios'
import { DELETE_SERVER, FETCH_SERVERS, SERVER_UPDATED } from './actions.type'
import {
  FETCH_SERVERS_END,
  FETCH_SERVERS_START,
  DELETE_SERVERS_START,
  DELETE_SERVERS_END,
  SERVER_MAP_CHANGED
} from './mutations.type'
import ApiResponse from '@/plugins/Repository/ApiResponse'
import Server from '@/models/api/servers/Server'

class State {
    public servers: Server[] = [];
    public isServersLoading: boolean = true;
    public serversCount: number = -1;
}

const moduleState = () => new State()

const getters = {
  servers (state: State) {
    return state.servers
  },
  serversCount (state: State) {
    return state.serversCount
  },
  isServersLoading (state: State) {
    return state.isServersLoading
  }
}

const actions = {
  [FETCH_SERVERS] ({ commit }: any): any {
    commit(FETCH_SERVERS_START)
    return this.$repositories.servers.getServerStatuses().then((data: AxiosResponse<ApiResponse>) => {
      commit(FETCH_SERVERS_END, data)
    }).catch((err: AxiosError) => {
      this.$toast.error(err.message)
      console.log(err)
    })
  },
  [DELETE_SERVER] ({ dispatch, commit }: any, params: any): any {
    commit(DELETE_SERVERS_START)
    return this.$repositories.servers.deleteServer(params.ip_address, params.port).then((data: AxiosResponse<ApiResponse>) => {
      commit(DELETE_SERVERS_END, data)
      dispatch(FETCH_SERVERS)
    }).catch((err: AxiosError) => {
      this.$toast.error(err.message)
      console.log(err)
    })
  },
  [SERVER_UPDATED] ({ commit }: any, model: Server): any {
    commit(SERVER_MAP_CHANGED, model)
  }
}

const mutations = {
  [FETCH_SERVERS_START] (state: State) {
    state.isServersLoading = true
  },
  [FETCH_SERVERS_END] (state: State, resp: ApiResponse) {
    state.servers = resp.body.map((item: any) => new Server(item.id, item.ip_address, item.port, item.name, item.current_map, item.last_updated))
    state.serversCount = resp.body.length
    state.isServersLoading = false
  },
  [DELETE_SERVERS_START] (state: State) {
    state.isServersLoading = true
  },
  [DELETE_SERVERS_END] (state: State) {
    state.isServersLoading = false
  },
  [SERVER_MAP_CHANGED] (state: State, model: Server) {
    console.log(model)
    const idx = state.servers.findIndex(server => server.id === model.id)
    const servers = [...state.servers]
    servers[idx].name = model.name
    servers[idx].current_map = model.current_map
    servers[idx].last_updated = model.last_updated
    state.servers = servers
    console.log(servers)
    state.isServersLoading = false
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
