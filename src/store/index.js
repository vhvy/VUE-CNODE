import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/module/user";
import global from "@/store/module/global";
import msg from "@/store/module/msg";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        global,
        msg
    }
});

export default store;