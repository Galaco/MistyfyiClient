import { AxiosResponse, AxiosError } from 'axios'
import { DISABLE_MAP_NAME } from './actions.type'
import {
  DISABLE_MAP_NAME_END,
  DISABLE_MAP_NAME_START
} from './mutations.type'
import ApiResponse from '@/plugins/Repository/ApiResponse'

class State {
    public loadingMapNameDisable: boolean = true;
}

const moduleState = () => new State()

const getters = {
  loadingMapNameDeletion (state: State) {
    return state.loadingMapNameDisable
  }
}

const actions = {
  [DISABLE_MAP_NAME] ({ commit }: any, { model, isDisabled }: any): void {
    commit(DISABLE_MAP_NAME_START)
    return this.$repositories.mapName.disableMapName(model.name, isDisabled).then((data: AxiosResponse<ApiResponse>) => {
      commit(DISABLE_MAP_NAME_END, data)
    }).catch((err: AxiosError) => {
      console.log(err)
    })
  }
}

const mutations = {
  [DISABLE_MAP_NAME_START] (state: State) {
    state.loadingMapNameDisable = true
  },
  [DISABLE_MAP_NAME_END] (state: State) {
    state.loadingMapNameDisable = false
  }
}

export default {
  state: moduleState,
  getters,
  actions,
  mutations
}
