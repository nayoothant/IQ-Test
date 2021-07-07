import { bus } from "/src/main";
import $ from  'jquery'
import constants from "../../constants";
export default {
    name: 'QuestionCreate',
    data() {
        return this.init()
    },
    computed: {
        choiceTypeText() {
            this.clearAnswerChoice()
            return this.choiceType == "text"
        },
        choiceTypePhoto() {
            this.clearAnswerChoice()
            return this.choiceType == "image"
        }
    },
    methods: {
        init() {
            return {
                qstGroupList: [],
                qstTypeList: [],
                choiceList: [],
                choiceCount: constants.CHOICE_COUNT,
                qstGroup: '',
                qstType: '',
                qstText: '',
                answerChoice: {
                    choice1: null,
                    choice2: null,
                    choice3: null,
                    choice4: null,
                    choice5: null,
                },
                imageChoice: {
                    choice1: null,
                    choice2: null,
                    choice3: null,
                    choice4: null,
                    choice5: null,
                },
                rightAns: null,
                description: '',
                duration: '',
                valid: true,
                selectGroup: null,
                selectType: null,
                selectChoiceCount: null,
                rightAnswerVisible: false,
                descriptionVisible: false,
                durationVisible: false,
                descriptionRule: constants.DESC_RULE,
                durationRule: constants.DURATION_RULE,
                questionTextRule: constants.QUESTION_TEXT_RULE,
                choiceCountRule: constants.CHOICE_COUNT_RULE,
                questionChoiceRule: constants.QUESTION_CHOICE_RULE,
                rightAnswerRule: constants.RIGHT_ANSWER_RULE,
                questionGroupRule: [],
                questionTypeRule: [],
                newTypeDisable: true,
                oldTypeDisable: true,
                oldGroupDisable: false,
                newGroupDisable: false,
                result: false,
                choiceType: "text",
                imageVisible: false
            }
        },
        setQstGroup(value) {
            if (!value) {
                this.oldGroupDisable = false;
                this.newTypeDisable = true;
                this.qstType = ""
                this.oldTypeDisable = true;
            } else {
                this.oldGroupDisable = true;
                this.newTypeDisable = false;
                this.oldTypeDisable = true;
                this.selectType = null;
            }

        },
        setNewType(value) {
            if (!value && !this.qstGroup) {
                this.oldTypeDisable = false;
            } else {
                this.oldTypeDisable = true;
            }
        },
        setOldType() {
            if (this.selectType) {
                this.qstType = ""
                this.newTypeDisable = true;
            } else {
                this.newTypeDisable = false;
            }
        },
        setChoiceCount() {
            this.rightAnswerVisible = true;
            const self = this
            this.choiceList = []
            this.choiceCount.slice(0, this.selectChoiceCount).forEach(function (count) {
                self.choiceList.push("choice" + count)
            });
            this.choiceCount.slice(this.selectChoiceCount, this.choiceCount.length).forEach(function (count) {
                self.answerChoice['choice' + count] = null
            });
        },
        clearAnswerChoice() {
            const self = this
            this.choiceCount.forEach(function (count) {
                self.answerChoice['choice' + count] = null
            });
        },
        updateDuration(event) {
            const value = event.target.value
            if (value > 60) {
                this.duration = 60
            }
            this.$forceUpdate()
        },
        async getQstType() {
            if (this.selectGroup) {
                await this.$store.dispatch("getQuestionType", { params: { qstGroup: this.selectGroup } })
                const state = this.$store.state.QuestionCreateStore;
                this.qstTypeList = []
                const self = this
                state.questionTypeList.forEach(function (question) {
                    self.qstTypeList.push(question.question_type)
                });
                this.newTypeDisable = false;
                this.oldTypeDisable = false;
                this.newGroupDisable = true;
            } else {
                this.qstType = ""
                this.selectType = null
                this.oldTypeDisable = true;
                this.newGroupDisable = false;
            }
        },
        async createQuestion() {
            if (!this.qstGroup && !this.selectGroup) {
                this.questionGroupRule = constants.QUESTION_GROUP_RULE
            }
            if (!this.qstType && !this.selectType) {
                this.questionTypeRule = constants.QUESTION_TYPE_RULE
            }
            if (this.$refs.form.validate()) {
                const qstGroup = this.selectGroup ? this.selectGroup : this.qstGroup;
                const qstType = this.selectType ? this.selectType : this.qstType;
                for (const choice in this.answerChoice) {
                    if (this.answerChoice[choice] != null && typeof this.answerChoice[choice] == 'object') {
                        await this.getBase64(this.answerChoice[choice]).then(
                            data => this.imageChoice[choice] = data
                          );
                    }
                }
                await this.$store.dispatch('createQuestion', {
                    qstGroup: qstGroup,
                    qstType: qstType,
                    description: this.description,
                    duration: this.duration,
                    qstText: this.qstText,
                    answerChoice: this.imageChoice.choice1 != null ? this.imageChoice : this.answerChoice,
                    choiceType: this.choiceType,
                    rightAns: this.rightAns
                })
                for (const image in this.imageChoice) {
                   this.imageChoice[image] = null;
                }
                const state = this.$store.state.QuestionCreateStore
                this.result = state.result
                if (this.result) {
                    bus.$emit('refreshSideBar')
                    this.qstGroup = ""
                    this.qstType = ""
                    this.selectGroup = null
                    this.selectType = null
                    this.newTypeDisable = true
                    this.oldTypeDisable = true
                    this.oldGroupDisable = false
                    this.newGroupDisable = false
                    await this.getQuestionList();
                }
            }
        },
        async getQuestionList() {
            await this.$store.dispatch("getQuestionList");
            this.qstGroupList = []
            const self = this
            this.$store.state.SideBarStore.questionList.forEach(function (question) {
                self.qstGroupList.push(question.qstGroup)
            });
        },
        async getBase64(file) {
            return await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        showImage(event, i) {
            this.imageVisible = true;          
            if (event) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image'+i)
                        .attr('src', e.target.result)
                };

                reader.readAsDataURL(event);
            } else {
                $('#image'+i)
                    .attr('src', '')

            }
        }
    },
    async created() {
        await this.getQuestionList()
    },
    watch: {
        qstGroup() {
            this.questionGroupRule = []
        },
        selectGroup() {
            this.questionGroupRule = []
        },
        qstType(val) {
            if (!val) {
                this.description = ""
                this.duration = ""
                this.descriptionVisible = false;
                this.durationVisible = false;
            } else {
                this.descriptionVisible = true;
                this.durationVisible = true;
            }
            this.questionTypeRule = []
        },
        selectType() {
            this.questionTypeRule = []
        }
    }
}