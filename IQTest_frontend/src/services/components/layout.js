import { mapGetters } from "vuex";
import SideBar from "/src/components/SideBar";
import constants from "../../constants";

export default {
    components: {
        SideBar
    },
    data() {
        return {
            title: constants.APP_TITLE,
        };
    },
    computed: {
        ...mapGetters(["isLoggedIn", "userType", "userName"]),
    },
    methods: {
        /**
         * This is to log out from system.
         * @returns void
         */
        logout() {
            this.$store
                .dispatch("logout")
                .then(() => {
                    
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * This is to route profile page.
         * @returns void
         */
        showProfile() {
            // TODO: do something
        },
    },
};
