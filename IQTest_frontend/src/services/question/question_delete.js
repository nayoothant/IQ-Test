import { bus } from "/src/main";
export default {
    name: 'QuestionDeleteAlert',
    data() {
        return {
            result: false
        }
    },
    // To use props, they must be declared
    props: {
        visible: Boolean,
        questionDetail: Object
    },
    computed: {
        isVisible() {
            return this.visible
        }
    },
    methods: {
        closeDeleteAlert() {
            this.$emit('click')
        },
        async deleteQuestion() {
            await this.$store.dispatch('deleteQuestion', this.questionDetail.id)
            const state = this.$store.state.QuestionDeleteStore
            this.result = state.result
            if (this.result) {
                bus.$emit("qstInfo", {
                    qstGroup: this.questionDetail.question_group,
                    qstType: this.questionDetail.question_type
                })
            }
        }
    }
}