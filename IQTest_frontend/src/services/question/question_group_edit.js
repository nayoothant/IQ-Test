import { bus } from "/src/main";
export default {
    name: "QuestionGroupEdit",
    data() {
        return {
            alertVisible: false,
            groupDisp: "",
            typeDisp: "",
            id: "",
            qstGroup: "",
            qstType: "",
            description: "",
            duration: "",
            message: "",
            result: true
        };
    },
    methods: {
        setGroupInfo(payload) {
            this.groupDisp = payload.qstGroup
            this.typeDisp = payload.qstType
            this.id = payload.id
            this.qstGroup = payload.qstGroup
            this.qstType = payload.qstType
            this.description = payload.description
            this.duration = payload.duration
        },
        updateDuration(event) {
            const value = event.target.value
            if (value > 60) {
                this.duration = 60
            }
            this.$forceUpdate()
        },
        async updateGroup() {
            await this.$store.dispatch('updateGroup', {
                id: this.id,
                qstGroup: this.qstGroup,
                qstType: this.qstType,
                description: this.description,
                duration: this.duration
            })
            const state = this.$store.state.QuestionGroupEditStore
            this.result = state.result
            if (this.result) {
                bus.$emit('refreshSideBar')
                this.$router.push({
                    name: 'question-list', params: {
                        qstGroup: this.qstGroup,
                        qstType: this.qstType
                    }
                })
            } else {
                this.alertVisible = true
                this.message = state.message
            }
        }
    },
    created() {
        this.setGroupInfo(this.$route.params)
    }
}