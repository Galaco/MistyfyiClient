import {DELETE_SERVER, FETCH_SERVERS} from './actions.type';
import {FETCH_SERVERS_END, FETCH_SERVERS_START, DELETE_SERVERS_START, DELETE_SERVERS_END} from './mutations.type';
import {deleteServer, getServerStatuses} from '../utils/servers-api';
import {reauthenticate} from '../utils/auth';


class State {
    public servers: any[] = [];
    public isLoading: boolean = true;
    public serversCount: number = -1;
}

const moduleState = new State();

const getters = {
    servers(state: State) {
        return state.servers;
    },
    serversCount(state: State) {
        return state.serversCount;
    },
    isLoading(state: State) {
        return state.isLoading;
    },
};

const actions = {
    [FETCH_SERVERS]({ commit }: any) {
        commit(FETCH_SERVERS_START);
        return getServerStatuses()
            .then(({ data }: any) => {
                commit(FETCH_SERVERS_END, data.body);
            }).catch((err: any) => {
                const resp = err.response.data;
                if (resp.code === 401) {
                    reauthenticate();
                }
            });
    },
    [DELETE_SERVER]({ commit }: any, params: any) {
        commit(DELETE_SERVERS_START);
        return deleteServer(params.ip_address, params.port)
            .then(({ data }: any) => {
                commit(DELETE_SERVERS_END, data.body);
            }).catch((err: any) => {
                const resp = err.response.data;
                if (resp.code === 401) {
                    reauthenticate();
                }
                commit(DELETE_SERVERS_END, resp.body);
            });
    },
};

const mutations = {
    [FETCH_SERVERS_START](state: State) {
        state.isLoading = true;
    },
    [FETCH_SERVERS_END](state: State, servers: any) {
        state.servers = servers;
        state.serversCount = servers.length;
        state.isLoading = false;
    },
    [DELETE_SERVERS_START](state: State) {
        state.isLoading = true;
    },
    [DELETE_SERVERS_END](state: State) {
        state.isLoading = false;
    },
};

export default {
    state: moduleState,
    getters,
    actions,
    mutations,
};
