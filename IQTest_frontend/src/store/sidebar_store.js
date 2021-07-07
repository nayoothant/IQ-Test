import axios from "axios";
export default {
    state: {
        questionList: [],
        qstGroup: "",
        qstType: ""
    },
    actions: {
        async getQuestionList({commit}) {
            await axios
            .get("questions/question_list")
            .then((response) => {
                commit('setQuestionList', response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        },
        setQstInfo({state},payload) {
            state.qstGroup = payload.qstGroup
            state.qstType = payload.qstType
        }

    },
    mutations: {
        setQuestionList(state, data) {
            state.questionList = data
        }
    }
}