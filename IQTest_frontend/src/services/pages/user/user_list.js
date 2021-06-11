import { mapGetters } from "vuex";
export default {
    data() {
        return {
            userList: []
        };
    },
    mounted() {
        this.$axios
            .get("/users")
            .then((response) => {
                this.userList = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
