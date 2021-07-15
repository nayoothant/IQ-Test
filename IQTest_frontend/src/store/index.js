import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import SideBarStore from "/src/store/sidebar_store";
import QuestionListStore from "/src/store/question/question_list_store";
import QuestionCreateStore from "/src/store/question/question_create_store";
import QuestionUpdateStore from "/src/store/question/question_update_store";
import QuestionDeleteStore from "/src/store/question/question_delete_store";
import QuestionGroupEditStore from "/src/store/question/question_group_edit_store";
import QuestionGroupDeleteStore from "/src/store/question/question_group_delete_store";

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

const modules = {
  SideBarStore,
  QuestionListStore,
  QuestionCreateStore,
  QuestionUpdateStore,
  QuestionDeleteStore,
  QuestionGroupEditStore,
  QuestionGroupDeleteStore
}
export default new Vuex.Store({
  modules,
  state: {
    admin: null,
    user: null,
    answer: [],
    error: ''
  },
  mutations: {
    setUserData(state, userData) {
      state.user = userData;
    },
    setAdminData(state, adminData) {
      state.admin = adminData;
    },
    setAnswerData(state, answerData) {
      state.answer = answerData;
    },
    setErrorMessage(state, errorMsg) {
      state.error = errorMsg;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return axios.post("admins/login", credentials).then(({ data }) => {
        if (data.error) {
          commit("setErrorMessage", data.error)
        } else {
          commit("setAdminData", data);
          commit("setErrorMessage", "")
        }
      });
    },
    clearAdminData({ commit }) {
      commit("setAdminData", null);
    },
    logout({ commit }, credentials) {
      return axios.post("/logout", credentials).then(() => {
        commit("setAdminData", null);
      });
    },
    create({ commit }, credentials) {
      return axios.post("/users", credentials).then(({ data }) => {
        if (data.errorMessage) {
          commit("setErrorMessage", data.errorMessage)
        } else {
          commit("setErrorMessage", '')
          commit("setUserData", data);
        }
      });
    },
    async storeAnswer({ commit }, credentials) {
      await axios.post("answers/store_answers", credentials).then(({ data }) => {
        commit("setAnswerData", data);
      });
    },
    async updateUser({ commit }, credentials) {
      await axios.put(`users/${credentials.userId}`, credentials).then(({ data }) => {
        commit("setAnswerData", data);
      });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.admin,
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
