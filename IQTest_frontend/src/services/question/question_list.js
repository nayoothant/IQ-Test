import QuestionDetail from "/src/pages/question/QuestionDetail.vue";
import { bus } from "/src/main";
export default {
    name: 'QuestionList',
    components: {
        QuestionDetail
    },
    data() {
        return {
            qstGroup: "",
            qstType: "",
            questionTypeList: [],
            questionInfoList: [],
            questionListVisible: false,
            detailPopupVisible: false,
            questionDetail: null,
            headers: [
                {
                    text: "No",
                    align: "start",
                    value: "questionNo",
                },
                {
                    text: "Question Text",
                    value: "question_text",
                },
                {
                    text: "Choice One",
                    value: "answer_choice.choice_1"
                },
                {
                    text: "Choice Two",
                    value: "answer_choice.choice_2"
                },
                {
                    text: "Choice Three",
                    value: "answer_choice.choice_3"
                },
                {
                    text: "Choice Four",
                    value: "answer_choice.choice_4"
                },
                {
                    text: "Choice Five",
                    value: "answer_choice.choice_5"
                },
                {
                    text: "Created At",
                    value: "created_at"
                },
            ],
        };
    },
    methods: {
        getQuestionInfo(payload) {
            this.qstGroup = payload.qstGroup
            this.qstType = payload.qstType
            this.$store.dispatch("getQuestionInfo", {
                questionGroup: payload.qstGroup,
                questionType: payload.qstType
            })
            .then(() => {
                const state = this.$store.state.QuestionListStore
                this.questionInfoList = state.questionInfoList;
                this.questionListVisible = true;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        showQuestionDetail(item) {
            this.questionDetail = item;
            this.detailPopupVisible = true;
        },
        closeButtonClick() {
            this.detailPopupVisible = false
        },
        goToQuestionCreate() {
            this.$router.push({ name: "question-create" });
        }
    },
    created() {
        bus.$on("qstInfo", (payload) => {
            this.getQuestionInfo(payload)
        })
        this.getQuestionInfo(this.$route.params)
    },
};

