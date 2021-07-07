import axios from "axios";
export default {
    state: {
        questionTypeList: [],
        questionForm: {
            qstGroup: '',
            qstType: '',            
            description: '',
            duration: '',        
            qstText: '',
            choiceType: '',        
            answerChoice: {
                choice1: '',
                choice2: '',
                choice3: '',
                choice4: '',
                choice5: '',
            },
            rightAns: '',
        },
        result: null
    },
    actions: {
        async getQuestionType({commit},payload) {
            await axios
            .get("questions/get_question_type", payload)
            .then((response) => {
                commit('setQuestionTypeList', response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async createQuestion({state, commit}, payload) {
            commit('setQstForm', payload)
            await axios.post("questions/create_question", {questionForm: state.questionForm})
            .then((response) => {
                commit('setResult', response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }

    },
    mutations: {
        setQuestionTypeList(state, data) {
            state.questionTypeList = data
        },
        setQstForm(state, payload) {
            state.questionForm.qstGroup = payload.qstGroup;
            state.questionForm.qstType = payload.qstType;
            state.questionForm.description = payload.description;
            state.questionForm.duration = payload.duration;
            state.questionForm.qstText = payload.qstText;
            state.questionForm.choiceType = payload.choiceType;
            state.questionForm.answerChoice = payload.answerChoice;
            state.questionForm.rightAns = payload.rightAns;
        },
        setResult(state, payload) {
            state.result = payload.result;
        }
    }
}