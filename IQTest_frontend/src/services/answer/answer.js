// import { mapGetters } from "vuex";
export default {
    name: 'AnswerPage',
    data() {
        return {
            valid: true,
            question: [],
            questVisiable: false,
            desVisiable: true,
        };
    },
    mounted() {
        const questionGroup = `g-${Math.floor(Math.random() * 3) + 1}`;
        this.$axios
            .get("questions/get_questions", {
                params: { question_group: questionGroup }
            })
            .then((response) => {
                this.question = response.data;
                console.log(this.question);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    methods: {
        startAnswer() {
            this.desVisiable=false;
            this.questVisiable= true;
        }
    }
};
