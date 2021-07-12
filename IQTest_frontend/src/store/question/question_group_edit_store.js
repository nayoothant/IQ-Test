import axios from "axios";
export default {
    state: {
        result: false,
        message: ""
    },
    actions: {
        async updateGroup({commit},payload) {
            await axios
            .post("questions/update_question_group", {qstGroupEditForm: payload})
            .then((response) => {
                commit('setResult', response.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }

    },
    mutations: {
        setResult(state, data) {
            state.result = data.result
            state.message = data.message
        }
    }
}