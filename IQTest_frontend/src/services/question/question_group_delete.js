import { bus } from "/src/main";
// import $ from  'jquery'
export default {
    name: 'QuestionGroupDeleteAlert',
    data() {
        return {
            result: false
        }
    },
    // To use props, they must be declared
    props: {
        visible: Boolean,
        qstGroup: String,
        qstType: String
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
        async deleteGroup() {
            await this.$store.dispatch('deleteGroup', {
                qstGroup: this.qstGroup,
                qstType: this.qstType
            })
            const state = this.$store.state.QuestionGroupDeleteStore
            this.result = state.result
            if (this.result) {
                this.closeDeleteAlert()
                bus.$emit("refreshSideBar")
                this.$router.push({path: "/"})
            }
        }
    }
}