import {DELETE_SERVER, FETCH_SERVERS} from './actions.type';
import {FETCH_SERVERS_END, FETCH_SERVERS_START, DELETE_SERVERS_START, DELETE_SERVERS_END} from './mutations.type';
import {deleteServer, getServerStatuses} from '@/utils/api/servers';
import { normalizeResponse } from '@/utils/api/transform';
import {getAccessToken} from '@/plugins/auth0';


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
    async [FETCH_SERVERS]({ commit }: any) {
        commit(FETCH_SERVERS_START);
        try {
            const { data } = await getServerStatuses();
            commit(FETCH_SERVERS_END, data.body);
        } catch (err) {
            const resp = normalizeResponse(err, []);
            if (resp.code === 401) {
                getAccessToken();
            }
            console.log(window);
            commit(FETCH_SERVERS_END, resp.body);
        }
    },
    async [DELETE_SERVER]({ commit }: any, params: any) {
        commit(DELETE_SERVERS_START);
        try {
            const { data } = await deleteServer(params.ip_address, params.port);
            commit(DELETE_SERVERS_END, data.body);
        } catch (err) {
            const resp = normalizeResponse(err);
            if (resp.code === 401) {
                getAccessToken();
            }
        }
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
