// import { mapGetters } from "vuex";
export default {
  name: "AnswerPage",
  data() {
    return {
      valid: true,
      questionGroup: [],
      isQuestionVisiable: false,
      isDescriptionVisiable: true,
      userChoice: {},
      duration: "",
      description: [],
      question: [],
      countDown: "",
      indexByType: "",
      countDownTimer: "",
    };
  },
  mounted() {
    this.$axios
      .get("questions/get_questions")
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
  // beforeRouteLeave(to, from, next) {
  //   // If the form is dirty and the user did not confirm leave,
  //   // prevent losing unsaved changes by canceling navigation
  //   if (this.confirmStayInDirtyForm()) {
  //     next(false);
  //   } else {
  //     // Navigate to next view
  //     next();
  //   }
  // },
  // created() {
  //   window.addEventListener("beforeunload", this.beforeWindowUnload);
  // },

  // beforeDestroy() {
  //   window.removeEventListener("beforeunload", this.beforeWindowUnload);
  // },
  methods: {
    startAnswer(questionByType, typeIdx) {
      this.isDescriptionVisiable = false;
      this.isQuestionVisiable = true;
      this.question = questionByType;
      this.indexByType = typeIdx;
      // this.$router.push({ name: 'answer', params: { question: this.question } })
      this.countDown = this.question[0].duration * 60;
      this.startTimer(this.countDown);
    },

    /**
     * This to add countdown timer.
     * @param {} duration
     * @returns void
     */
    startTimer(duration) {
      var timer = duration,
        minutes,
        seconds;
      this.countDownTimer = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.querySelector("#time").textContent = minutes + ":" + seconds;

        if (--timer < 0) {
          timer = duration;
        }
        if (timer === 0) {
          document.getElementById("thebutton").click();
          clearInterval(this.countDownTimer);
        }
      }, 1000);
    },

    /**
     * This to submit create answer form.
     * @returns void
     */
    async storeAnswer() {
      this.isDescriptionVisiable = true;
      this.isQuestionVisiable = false;
      console.log(this.indexByType);
      clearInterval(this.countDownTimer);
      this.userChoice = {};
      this.questionGroup.splice(this.indexByType, 1);
      if (this.questionGroup.length === 0) {
        this.$router.push({ name: "answer-index" });
      }
      await this.$store.dispatch("storeAnswer", {
        userChoiceData: this.userChoice,
        userId: this.$store.state.user.id,
      });
      await this.$store.dispatch("updateUser", {
        userId: this.$store.state.user.id,
      });
    },
    // confirmLeave() {
    //   return window.confirm(
    //     "Do you really want to leave? you have unsaved changes!"
    //   );
    // },

    // confirmStayInDirtyForm() {
    //   return this.form_dirty && !this.confirmLeave();
    // },

    // beforeWindowUnload(e) {
    //   if (this.confirmStayInDirtyForm()) {
    //     // Cancel the event
    //     e.preventDefault();
    //     // Chrome requires returnValue to be set
    //     e.returnValue = "";
    //   }
    // },
  },
};
