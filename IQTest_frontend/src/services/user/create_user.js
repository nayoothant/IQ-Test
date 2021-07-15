import constants from "../../constants";

export default {
    data: () => ({
        valid: true,
        email: "",
        name: "",
        phone: "",
        error: "",
        title: constants.APP_TITLE,

        // validation rules for user email.
        emailRules: [
            value => !!value || "The email field is required.",
            value => /.+@.+\..+/.test(value) || "E-mail must be valid."
        ],
        nameRules: [value => !!value || "The username field is required."],
        phoneRules: [value => !!value || "The phone field is required."],
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
                    let state = this.$store.state
                    if(state.error) {                        
                        this.error = state.error;
                    } else {
                        this.error = ''
                        this.$router.push({ name: "answer-page" });
                    }
                })
        }
    },
    created() {
        this.$store.dispatch("clearAdminData")
    }
};
