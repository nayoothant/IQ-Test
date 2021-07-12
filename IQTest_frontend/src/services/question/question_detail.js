import constants from "../../constants"

export default {
    name: 'QuestionDetail',
    // To use props, they must be declared
    props: {
      visible: Boolean,
      questionDetail: Object
    },
    computed: {
        isVisible() {
            return this.visible
        },
        isRightAnswer() {
            return this.questionDetail.right_answer
        },
        isImageChoice() {
            return this.questionDetail.choice_type === "image"
        }
    },
    methods: {
        closeButtonClick() {
            this.$emit('click')
        },
        goToUpdatePage() {
            this.$router.push({name: 'question-update', params: {
                qstInfo: this.questionDetail
            }})
        },
        getImage(item) {
            return constants.ROOT_PATH + this.questionDetail.question_group + '_' + this.questionDetail.question_type + '/' + item
        },
        prevent(event) {
            event.preventDefault();
        }
    }
  }