// import { mapGetters } from "vuex";
export default {
  name: "AnswerPage",
  data() {
    return {
      valid: true,
      question: [],
      description: "",
      questVisiable: false,
      desVisiable: true,
      userChoice: {},
      duration: "",
      minutes: 0,
      secondes: 0,
      time: 0,
      timer: null,
    };
  },
  mounted() {
    const questionGroup = `g-${Math.floor(Math.random() * 3) + 1}`;
    this.$axios
      .get("questions/get_questions", {
        params: { question_group: questionGroup },
      })
      .then((response) => {
        this.question = response.data;
        console.log(this.question);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    startAnswer() {
      this.desVisiable = false;
      this.questVisiable = true;
    },
    /**
     * This to submit create user form.
     * @returns void
     */
    storeAnswer() {
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
