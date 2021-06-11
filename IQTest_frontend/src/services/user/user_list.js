// import { mapGetters } from "vuex";
export default {
    data() {
        return {
            userList: [],
            headers: [
                {
                    text: "ID",
                    align: "start",
                    value: "id",
                },
                {
                    text: "Email",
                    value: "email",
                },
                {
                    text: "Password",
                    value: "password",
                }
            ],
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
