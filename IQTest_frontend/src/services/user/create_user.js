export default {
    data: () => ({
        valid: true,
        email: "",
        name: "",
        phone: "",
        error: "",

        // validation rules for user email.
        emailRules: [
            value => !!value || "The email field is required.",
            value => /.+@.+\..+/.test(value) || "E-mail must be valid."
        ]
    }),
    methods: {
        /**
         * This to submit create user form.
         * @returns void
         */
        create() {
            this.$store
                .dispatch("create", {
                    email: this.email,
                    name: this.name,
                    phone: this.phone
                })
                .then(() => {
                    this.error = "";
                    this.$router.push({ name: "user-list" });
                })
                .catch(err => {
                    this.error = err.response.data.errors.message;
                    console.log(err);
                });
        }
    }
};
