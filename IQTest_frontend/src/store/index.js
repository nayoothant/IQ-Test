import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import SideBarStore from "/src/store/sidebar_store";
import QuestionListStore from "/src/store/question_list_store";
import QuestionCreateStore from "/src/store/question_create_store";
import QuestionUpdateStore from "/src/store/question_update_store";
import QuestionDeleteStore from "/src/store/question_delete_store";

Vue.use(Vuex);

axios.defaults.baseURL = "http://localhost:3000";

const modules = {
    SideBarStore,
    QuestionListStore,
    QuestionCreateStore,
    QuestionUpdateStore,
    QuestionDeleteStore
  }

export default new Vuex.Store({
    modules,
    state: {
        user: null,
    },
    mutations: {
        setUserData(state, userData) {
            state.user = userData;
        },
    },
    actions: {
        login({ commit }, credentials) {
            return axios.post("/auth/login", credentials).then(({ data }) => {
                commit("setUserData", data);
            });
        },
        logout({ commit }, credentials) {
            return axios.post("/auth/logout", credentials).then(() => {
                commit("setUserData", null);
            });
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.user,
        userType: (state) => {
            if (state.user && state.user.data.user_type) {
                return state.user.data.user_type;
            }
            return -1;
        },
        userId: (state) => {
            if (state.user && state.user.data.user_id) {
                return state.user.data.user_id;
            }
        },
        userName: (state) => {
            if (state.user && state.user.data.user_name) {
                return state.user.data.user_name;
            }
        },
    },
    plugins: [createPersistedState()],
});
