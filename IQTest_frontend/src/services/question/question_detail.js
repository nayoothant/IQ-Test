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
        }
    },
    methods: {
        closeButtonClick() {
            this.$emit('click')
        }
    }
  }