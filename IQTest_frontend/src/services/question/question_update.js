// import { bus } from "/src/main";
import axios from "axios";
import $ from  'jquery';
import constants from "../../constants";
export default {
    name: 'QuestionUpdate',
    data() {
        return {
            choiceList: [],
            choiceCount: constants.CHOICE_COUNT,
            id: '',
            qstNo: '',
            qstGroup: '',
            qstType: '',
            qstText: '',
            choiceType: '',
            description: '',
            duration: '',
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
            valid: true,
            selectChoiceCount: null,
            rightAnswerVisible: false,
            questionTextRule: constants.QUESTION_TEXT_RULE,
            choiceCountRule: constants.CHOICE_COUNT_RULE,
            questionChoiceRule: constants.QUESTION_CHOICE_RULE,
            rightAnswerRule: constants.RIGHT_ANSWER_RULE,
            result: false,
            imageVisible: true
        }
    },
    computed: {
        choiceTypeText() {
            return this.choiceType == "text"
        },
        choiceTypePhoto() {
            return this.choiceType == "image"
        }
    },
    methods: {
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
        async setSelectChoiceCount(payload) {
            var count = 0;
            for (const choice in payload) {

                if (payload[choice]) {
                    count++;
                    if (this.choiceType == 'text') {
                        this.answerChoice['choice' + count] = payload[choice]
                    } else {
                        await axios({
                            url: this.getImage(payload[choice]),
                            responseType: 'blob',
                            mode: "no-cors",
                            headers: {
                                "Accept": "application/json; odata=verbose"
                            }
                        })
                        .then(response => {
                            this.answerChoice['choice' + count] = new File([response.data], payload[choice], {
                                type: "image/jpeg",
                            })
                        })
                    }
                }
            }
            if (this.choiceType == 'image') {
                for (let i = 1; i <= count; i++) {                        
                    this.showImage(this.answerChoice['choice' + i], i)                   
                }
            }
            this.selectChoiceCount = count
        },
        getImage(item) {
            return '/images/' + this.qstGroup + '_' + this.qstType + '/' + item
        },
        showImage(event, i) {        
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
        },
        async setQuestionInfo(qstInfo) {
            this.id = qstInfo.id
            this.qstNo = qstInfo.questionNo
            this.qstGroup = qstInfo.question_group
            this.qstType = qstInfo.question_type
            this.qstText = qstInfo.question_text
            this.choiceType = qstInfo.choice_type
            this.description = qstInfo.description
            this.duration = qstInfo.duration
            this.rightAns = qstInfo.right_answer
            await this.setSelectChoiceCount(qstInfo.answer_choice)
            this.setChoiceCount()
        },
        async updateQuestion() {
            if (this.$refs.form.validate()) {
                for (const choice in this.answerChoice) {
                    if (this.answerChoice[choice] != null && typeof this.answerChoice[choice] == 'object') {
                        await this.getBase64(this.answerChoice[choice]).then(
                            data => this.imageChoice[choice] = data
                        );
                    }
                }
                await this.$store.dispatch('updateQuestion', {
                    id: this.id,
                    qstNo: this.qstNo,
                    qstGroup: this.qstGroup,
                    qstType: this.qstType,
                    description: this.description,
                    duration: this.duration,
                    qstText: this.qstText,
                    answerChoice: this.imageChoice.choice1 != null ? this.imageChoice : this.answerChoice,
                    choiceType: this.choiceType,
                    rightAns: this.rightAns
                })
                const state = this.$store.state.QuestionUpdateStore
                this.result = state.result
                if (this.result) {
                    this.$router.push({
                        name: 'question-list', params: {
                            qstGroup: this.qstGroup,
                            qstType: this.qstType
                        }
                    })
                }
            }
        },
        async getBase64(file) {
            return await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }

    },
    async created() {
        await this.setQuestionInfo(this.$route.params.qstInfo)
    },
}