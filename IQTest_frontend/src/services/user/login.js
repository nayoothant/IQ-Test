export default {
    data: () => ({
        valid: true,
        username: "",
        password: "",
        error: "",

        // validation rules for password.
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
                    this.error = "";
                    this.$router.push({ name: "post-list" });
                })
                .catch(err => {
                    this.error = err.response.data.errors.message;
                    console.log(err);
                });
        }
    }
};
