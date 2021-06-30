// import { mapGetters } from "vuex";
export default {
  name: "AnswerPage",
  data() {
    return {
      valid: true,
      questionGroup: [],
      questionVisiable: false,
      descriptionVisiable: true,
      userChoice: {},
      duration: "",
      description: [],
      question: [],
      countDown: "",
      indexByType: "",
    };
  },
  mounted() {
    // const questionGroup = `g-${Math.floor(Math.random() * 3) + 1}`;
    this.$axios
      .get("questions/get_questions", {
        params: { question_group: "g-2" },
      })
      .then((response) => {
        this.questionGroup = response.data;
        for (let index = 0; index < this.questionGroup.length; index++) {
          this.description.push(this.questionGroup[index][0].description);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    startAnswer(questionByType, typeIdx) {
      this.descriptionVisiable = false;
      this.questionVisiable = true;
      this.question = questionByType;
      this.indexByType = typeIdx;
      this.countDown = this.question[0].duration * 60;
      this.countDownTimer();
    },
    countDownTimer(){
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        document.getElementById('thebutton').click();
      }
    },
    /**
     * This to submit create user form.
     * @returns void
     */
    storeAnswer() {
      this.descriptionVisiable = true;
      this.questionVisiable = false;
      console.log(this.indexByType);
      this.questionGroup.splice(this.indexByType, 1);
      if (this.questionGroup.length === 0) {
        this.$router.push({ name: 'answer-index' });
      }
      this.$store
        .dispatch("storeAnswer", {
          userChoiceData: this.userChoice,
          userId: this.$store.state.user.id,
        })
        .then(
          this.$store.dispatch("updateUser", {
            userId: this.$store.state.user.id,
          })
        );
    },
  },
};
