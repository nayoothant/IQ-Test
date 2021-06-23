import axios from "axios";
export default {
    state: {
        questionInfoList: []
    },
    actions: {
        async getQuestionInfo({state},payload) {
            await axios
            .post("questions/get_question_info", payload)
            .then((response) => {
                state.questionInfoList = response.data
            })
            .catch((err) => {
                console.log(err);
            });
        }

    },
    mutations: {
        setQuestionList(state, payload) {
            state.questionList = payload
        }
    }
}