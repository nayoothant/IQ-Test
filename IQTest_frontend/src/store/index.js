import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import SideBarStore from "/src/store/sidebar";
import QuestionListStore from "/src/store/question_list";

Vue.use(Vuex);

axios.defaults.baseURL = "http://localhost:3000";

const modules = {
  SideBarStore,
  QuestionListStore,
};
export default new Vuex.Store({
  modules,
  state: {
    user: null,
    answer: [],
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
    setAnswerData(state, answerData) {
      state.answer = answerData;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return axios.post("/login", credentials).then(({ data }) => {
        commit("setUserData", data);
      });
    },
    logout({ commit }, credentials) {
      return axios.post("/auth/logout", credentials).then(() => {
        commit("setUserData", null);
      });
    },
    create({ commit }, credentials) {
      return axios.post("/users", credentials).then(({ data }) => {
        commit("setUserData", data);
      });
    },
    storeAnswer({ commit }, credentials) {
      return axios.post("answers/store_answers", credentials).then(({ data }) => {
        commit("setAnswerData", data);
      });
    },
    updateUser({ commit }, credentials) {
      return axios.put(`users/${credentials.userId}`, credentials).then(({ data }) => {
        commit("setAnswerData", data);
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
