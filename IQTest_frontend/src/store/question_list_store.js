import axios from "axios";
export default {
    state: {
        questionInfoList: []
    },
    actions: {
        async getQuestionInfo({commit},payload) {
            await axios
            .get("questions/get_question_info", payload)
            .then((response) => {
                commit('setQuestionInfoList', response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }

    },
    mutations: {
        setQuestionInfoList(state, data) {
            state.questionInfoList = data
        }
    }
}