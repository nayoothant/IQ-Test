import axios from "axios";
export default {
    state: {
        result: false,
    },
    actions: {
        async deleteQuestion({commit},payload) {
            await axios
            .post("questions/delete_question", {id: payload})
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
            state.result = data
        }
    }
}