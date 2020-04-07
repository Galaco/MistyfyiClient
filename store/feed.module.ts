import { AxiosResponse, AxiosError } from 'axios'
import { FETCH_FEED } from './actions.type'
import {
  FETCH_FEED_END,
  FETCH_FEED_START
} from './mutations.type'
import ApiResponse from '@/plugins/Repository/ApiResponse'
import Item from '~/models/api/feed/Item'

class State {
    public feedItems: Item[] = [];
    public feedItemsCount: number = -1;
    public isFeedItemsLoading: boolean = true;
}

const moduleState = () => new State()

const getters = {
  feedItems (state: State) {
    return state.feedItems
  },
  feedItemsCount (state: State) {
    return state.feedItemsCount
  },
  isFeedItemsLoading (state: State) {
    return state.isFeedItemsLoading
  }
}

const actions = {
  [FETCH_FEED] ({ commit }: any): any {
    commit(FETCH_FEED_START)
    return this.$repositories.feed.getFeedLatest().then((data: AxiosResponse<ApiResponse>) => {
      commit(FETCH_FEED_END, data)
    }).catch((err: AxiosError) => {
      this.$toast.error(err.message)
      console.log(err)
    })
  }
}

const mutations = {
  [FETCH_FEED_START] (state: State) {
    state.isFeedItemsLoading = true
  },
  [FETCH_FEED_END] (state: State, resp: ApiResponse) {
    state.feedItems = resp.body.map((item: any) => new Item(item.ipAddress, item.port, item.serverName, item.mapName, item.dateUpdated))
    state.feedItemsCount = resp.body.length
    state.isFeedItemsLoading = false
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
