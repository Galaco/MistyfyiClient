import Vue from "vue";
import Vuex from "vuex";

import servers from "./servers.module";
import levelNames from "./levelNames.module";
import server from "./server.module";
import user from "./user.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        servers,
        levelNames,
        server,
        user
    }
});
