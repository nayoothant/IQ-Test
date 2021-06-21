import QuestionDetail from "/src/pages/question/QuestionDetail.vue";
export default {
    name: 'QuestionList',
    components: {
        QuestionDetail
    },
    data() {
        return {
            qstGroup: "",
            qstType: "",
            questionList: [],
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
                    value: "choice_one"
                },
                {
                    text: "Choice Two",
                    value: "choice_two"
                },
                {
                    text: "Choice Three",
                    value: "choice_three"
                },
                {
                    text: "Choice Four",
                    value: "choice_Four"
                },
                {
                    text: "Choice Five",
                    value: "choice_five"
                },
                {
                    text: "Created At",
                    value: "created_at"
                },
            ],
        };
    },
    created() {
        
    this.$axios
        .get("questions/question_list")
        .then((response) => {
            this.questionList = response.data;
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        getQuestionInfo(payload) {
            this.qstGroup = payload.question_group
            this.qstType = payload.question_type
            this.$axios
            .post("questions/get_question_info", {
                questionGroup: payload.question_group,
                questionType: payload.question_type
            })
            .then((response) => {
                this.questionListVisible = true;
                this.questionInfoList = response.data;
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
        }
    },
    updated() {
        var dropdown = document.getElementsByClassName("dropdown-btn");
        var i;

        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            });
        }
    }
};

