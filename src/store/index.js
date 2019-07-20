import Vue from "vue";
import Vuex from "vuex";

import servers from "./servers.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        servers
    }
});