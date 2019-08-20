import {DELETE_SERVER, FETCH_SERVERS} from "./actions.type";
import {FETCH_END, FETCH_START} from "./mutations.type";
import {deleteServer, getServerStatuses} from "../utils/servers-api";
import {login} from "../utils/auth";


const state = {
    servers: [],
    isLoading: true,
    serversCount: -1,
};

const getters = {
    servers(state) {
        return state.servers;
    },
    serversCount(state) {
        return state.serversCount;
    },
    isLoading(state) {
        return state.isLoading;
    }
};

const actions = {
    [FETCH_SERVERS]({ commit }) {
        commit(FETCH_START);
        return getServerStatuses()
            .then(({ data }) => {
                commit(FETCH_END, data.body);
            }).catch(({ data }) => {
                if (data.code === 401) {
                    login();
                }
                commit(FETCH_END, data);
            });
    },
    [DELETE_SERVER]({ commit }, params) {
        commit(FETCH_START);
        return deleteServer(params.ip_address, params.port)
            .then(({ data }) => {
                commit(FETCH_END, data.body);
            }).catch(({ data }) => {
                if (data.code === 401) {
                    login();
                }
                commit(FETCH_END, data);
            });
    }
};

const mutations = {
    [FETCH_START](state) {
        state.isLoading = true;
    },
    [FETCH_END](state, servers) {
        state.servers = servers;
        state.serversCount = servers.length;
        state.isLoading = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
