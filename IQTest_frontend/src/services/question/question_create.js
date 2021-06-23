export default {
    name: 'QuestionCreate',
    data() {
        return {
            qstGroupList: [],
            choiceList: [],
            choiceCount: [1,2,3,4,5],
            qstGroup: '',
            qstType: '',
            qstText: '',
            choiceOne: '',
            choiceTwo: '',
            choiceThree: '',
            choiceFour: '',
            choiceFive: '',
            rightAns: '',
            description: '',
            duration: '',
            valid: true,
            select: null,
            ans: null,
            descriptionVisible: false,
            choiceOneVisible: false,
            choiceTwoVisible: false,
            choiceThreeVisible: false,
            choiceFourVisible: false,
            choiceFiveVisible: false,
            rightAnswerVisible: false
      }
    },    
    methods: {
        setChoiceOne(value) {
            this.choiceOne = value
        },
        setChoiceTwo(value) {
            this.choiceTwo = value
        },
        setChoiceThree(value) {
            this.choiceThree = value
        },
        setChoiceFour(value) {
            this.choiceFour = value
        },
        setChoiceFive(value) {
            this.choiceFive = value
        },
        setQstGroup(value) {
            if(!value) {
                this.descriptionVisible = false;
            } else {
                this.descriptionVisible = true;
            }

        },
        setChoiceCount() {
            this.rightAnswerVisible = true;
            switch(this.select) {
                case 1:
                    this.choiceOneVisible = true;
                    this.choiceTwoVisible = false;
                    this.choiceThreeVisible = false;
                    this.choiceFourVisible = false;
                    this.choiceFiveVisible = false;
                    this.choiceList = [1]
                  break;
                case 2:
                    this.choiceOneVisible = true;
                    this.choiceTwoVisible = true;
                    this.choiceThreeVisible = false;
                    this.choiceFourVisible = false;
                    this.choiceFiveVisible = false;
                    this.choiceList = [1,2]
                  break;
                case 3:
                    this.choiceOneVisible = true;
                    this.choiceTwoVisible = true;
                    this.choiceThreeVisible = true;
                    this.choiceFourVisible = false;
                    this.choiceFiveVisible = false;
                    this.choiceList = [1,2,3]
                break;
                case 4:
                    this.choiceOneVisible = true;
                    this.choiceTwoVisible = true;
                    this.choiceThreeVisible = true;
                    this.choiceFourVisible = true;
                    this.choiceFiveVisible = false;
                    this.choiceList = [1,2,3,4]
                break;
                case 5:
                    this.choiceOneVisible = true;
                    this.choiceTwoVisible = true;
                    this.choiceThreeVisible = true;
                    this.choiceFourVisible = true;
                    this.choiceFiveVisible = true;
                    this.choiceList = [1,2,3,4,5]
                break;
              }
        }
    },
    async created() {
                
        await this.$store.dispatch("getQuestionList");
        const obj = this
        this.$store.state.questionList.forEach(function (question) {
            obj.qstGroupList.push(question.qstGroup)
        });
    }
}