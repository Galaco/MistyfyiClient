import { AxiosResponse, AxiosError } from 'axios'
import { FETCH_POPULAR } from './actions.type'
import {
  FETCH_POPULAR_END,
  FETCH_POPULAR_START
} from './mutations.type'
import Popular from '@/models/api/Popular'
import Server from '@/models/api/servers/Server'
import WatchedMap from '@/models/api/maps/WatchedMap'
import HistoryItem from '@/models/api/servers/Historyitem'
import ApiResponse from '@/plugins/Repository/ApiResponse'

class State {
    public popularItems: Popular = new Popular();
    public isPopularItemsLoading: boolean = true;
}

const moduleState = () => new State()

const getters = {
  popularItems (state: State) {
    return state.popularItems
  },
  isPopularItemsLoading (state: State) {
    return state.isPopularItemsLoading
  }
}

const actions = {
  [FETCH_POPULAR] ({ commit }: any): Promise<ApiResponse> {
    commit(FETCH_POPULAR_START)
    return this.$repositories.popular.getPopular().then((data: AxiosResponse<ApiResponse>) => {
      commit(FETCH_POPULAR_END, data)
    }).catch((err: AxiosError) => {
      this.$toast.error(err.message)
      console.log(err)
    })
  }
}

const mutations = {
  [FETCH_POPULAR_START] (state: State) {
    state.isPopularItemsLoading = true
  },
  [FETCH_POPULAR_END] (state: State, resp: ApiResponse) {
    state.popularItems = new Popular(
      resp.body.servers.map((item: any) => new Server(item.id, item.ipAddress, item.port, item.name, item.currentMap, item.game, item.playerCount, item.maxPlayers, item.lastUpdated)),
      resp.body.maps.map((item: any) => new HistoryItem(item.map_name, item.dateCreated)),
      resp.body.mapNames.map((item: any) => new WatchedMap(item.id, item.name, item.serverId, item.disabled))
    )
    state.isPopularItemsLoading = false
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
