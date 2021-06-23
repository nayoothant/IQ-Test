import { bus } from "/src/main";
export default {
    name: 'SideBar',
    data() {
        return {
            questionList: []
        }        
    },
    async created() {
        
        await this.$store.dispatch("getQuestionList");
        this.questionList = this.$store.state.questionList
    },
    methods: {
        setQuestionInfo(question) {
            bus.$emit("qstInfo", {
                qstGroup: question.question_group,
                qstType: question.question_type
            })       
            if(this.$router.currentRoute.fullPath !== "/questionList") {
                this.$router.push({name: 'question-list', params: {
                    qstGroup: question.question_group,
                    qstType: question.question_type
                }})
            }
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
    },
}