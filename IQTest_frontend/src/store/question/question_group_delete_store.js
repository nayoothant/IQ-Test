import axios from "axios";
export default {
    state: {
        result: false,
    },
    actions: {
        async deleteGroup({commit},payload) {
            await axios
            .post("questions/delete_group", {
                qstGroup: payload.qstGroup,
                qstType: payload.qstType
            })
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