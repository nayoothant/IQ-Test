export default {
    data: () => ({
        valid: true,
        username: "",
        password: "",
        error: '',

        // validation rules for password.
        nameRules: [value => !!value || "The username field is required."],
        pwdRules: [value => !!value || "The password field is required."]
    }),
    methods: {
        /**
         * This to submit login form.
         * @returns void
         */
        login() {
            this.$store
                .dispatch("login", {
                    username: this.username,
                    password: this.password
                })
                .then(() => {
                    let state = this.$store.state
                    if(state.error) {                        
                        this.error = state.error;
                    } else {
                        this.error = ''
                        this.$router.push({ name: "question-groups" });
                    }
                   
                })
                .catch(err => {
                    this.error = err.response.data.errors.message;
                    console.log(err);
                });
        }
    },
    created() {
        this.$store.dispatch("clearAdminData")
    }
};
