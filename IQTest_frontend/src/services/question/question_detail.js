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
        isChoiceOneExist() {
            return this.questionDetail.choice_one
        },
        isChoiceTwoExist() {
            return this.questionDetail.choice_two
        },
        isChoiceThreeExist() {
            return this.questionDetail.choice_three
        },
        isChoiceFourExist() {
            return this.questionDetail.choice_four
        },
        isChoiceFiveExist() {
            return this.questionDetail.choice_five
        },
        isRightAnswer() {
            return this.questionDetail.right_answer
        }
    },
    methods: {
        closeButtonClick() {
            this.$emit('click')
        }
    }
  }