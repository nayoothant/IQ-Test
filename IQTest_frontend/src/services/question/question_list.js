import QuestionDetail from "/src/pages/question/QuestionDetail.vue";
import QuestionDeleteAlert from "/src/pages/question/QuestionDeleteAlert.vue";
import { bus } from "/src/main";
import constants from "../../constants";
export default {
    name: 'QuestionList',
    components: {
        QuestionDetail,
        QuestionDeleteAlert
    },
    data() {
        return {
            qstGroup: "",
            qstType: "",
            questionTypeList: [],
            questionInfoList: [],
            questionListVisible: false,
            detailPopupVisible: false,
            alertPopupVisible: false,
            questionDetail: null,
            headers: constants.HEADER,
        };
    },
    methods: {
        async getQuestionInfo(payload) {
            this.qstGroup = payload.qstGroup
            this.qstType = payload.qstType
            await this.$store.dispatch("getQuestionInfo",{ params: {
                questionGroup: payload.qstGroup,
                questionType: payload.qstType
            }})
            .then(() => {
                const state = this.$store.state.QuestionListStore
                this.questionInfoList = state.questionInfoList;
                this.questionListVisible = true;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getPath(item) {
            return require('D:/Nay Oo Thant/IQTest/IQTest_backend/public/images/'+ this.qstGroup + '_' + this.qstType + '/' + item)
        },
        showQuestionDetail(row, column) {
            this.questionDetail = column.item;
            this.detailPopupVisible = true;
        },
        deleteButtonClicked(item) {
            this.questionDetail = item;
            this.alertPopupVisible = true;
        },
        closeButtonClick() {
            this.detailPopupVisible = false
        },
        closeDeleteAlert() {
            this.alertPopupVisible = false
        },
        goToQuestionCreate() {
            this.$router.push({ name: "question-create" });
        },
        isImageChoice(item) {
            return item.choice_type === "image"
        }
    },
    created() {
        bus.$on("qstInfo", (payload) => {
            this.getQuestionInfo(payload)
        })
        this.getQuestionInfo(this.$route.params)
    },
};

