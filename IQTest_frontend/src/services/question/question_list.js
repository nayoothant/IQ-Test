import QuestionDetail from "/src/pages/question/QuestionDetail.vue";
import QuestionDeleteAlert from "/src/pages/question/QuestionDeleteAlert.vue";
import QuestionGroupDeleteAlert from "/src/pages/question/QuestionGroupDeleteAlert.vue";
import { bus } from "/src/main";
import constants from "../../constants";
export default {
    name: 'QuestionList',
    components: {
        QuestionDetail,
        QuestionDeleteAlert,
        QuestionGroupDeleteAlert
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
            groupDeletePopupVisible: false,
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
                if(this.questionInfoList.length > 0 ) {
                    this.questionListVisible = true;
                } else {
                    if(this.$router.currentRoute.fullPath !== "/") {                        
                        this.$router.push({path: "/"})
                    }                    
                }
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getPath(value, item) {
            if(item.question_group != this.qstGroup || item.question_type != this.qstType) {
                return ''
            } else {                
                return constants.ROOT_PATH + this.qstGroup + '_' + this.qstType + '/' + value   
            }         
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
        closeGroupDeleteAlert() {
            this.groupDeletePopupVisible = false
        },
        groupDeleteButtonClicked() {
            this.groupDeletePopupVisible = true
        },
        goToQuestionCreate() {
            this.$router.push({ name: "question-create" });
        },
        goToQuestionGroupEdit() {
            this.$router.push({ name: "question-group-edit", params: {
                id: this.questionInfoList[0].id,
                qstGroup: this.qstGroup,
                qstType: this.qstType,
                description: this.questionInfoList[0].description,
                duration: this.questionInfoList[0].duration
            }});
        },
        isImageChoice(item) {
            return item.choice_type === "image"
        }
    },
    created() {
        this.getQuestionInfo(this.$route.params)
    },
    mounted() {
        bus.$on("qstInfo", (payload) => {
            this.getQuestionInfo(payload)
        })
    }
};

