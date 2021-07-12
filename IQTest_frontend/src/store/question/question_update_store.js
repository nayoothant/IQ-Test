import axios from "axios";
export default {
    state: {
        qstForm: {
            id: '',
            qstNo: '',
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
        setQstUpdateForm({commit}, payload) {
            commit('setQstUpdateForm', payload)
        },
        async updateQuestion({state, commit}, payload) {
            commit('setQstUpdateForm', payload)
            await axios.post("questions/update_question", {questionForm: state.qstForm})
            .then((response) => {
                commit('setResult', response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }

    },
    mutations: {
        setQstUpdateForm(state, payload) {
            state.qstForm.id = payload.id
            state.qstForm.qstNo = payload.qstNo;
            state.qstForm.qstGroup = payload.qstGroup;
            state.qstForm.qstType = payload.qstType;
            state.qstForm.description = payload.description;
            state.qstForm.duration = payload.duration;
            state.qstForm.qstText = payload.qstText;
            state.qstForm.choiceType = payload.choiceType
            state.qstForm.answerChoice = payload.answerChoice;
            state.qstForm.rightAns = payload.rightAns;
        },
        setResult(state, payload) {
            state.result = payload.result;
        }
    }
}