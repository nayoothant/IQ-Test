import axios from "axios";
export default {
    state: {
        questionList: [],
        qstGroup: "",
        qstType: ""
    },
    actions: {
        async getQuestionList() {
            await axios
            .get("questions/question_list")
            .then((response) => {
                this.state.questionList = response.data
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
        setQuestionList(state, payload) {
            state.questionList = payload
        }
    }
}