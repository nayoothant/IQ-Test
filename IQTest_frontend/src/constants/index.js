const constants = {
    /**
     * App title
     */
    APP_TITLE: "IQ Test",
    CHOICE_COUNT: [1, 2, 3, 4, 5],
    DESC_RULE: [v => !!v || 'Description is required'],
    DURATION_RULE: [v => !!v || 'Duration is required'],
    QUESTION_TEXT_RULE: [v => !!v || 'QuestionText is required'],
    CHOICE_COUNT_RULE: [v => !!v || 'Choice Count is required'],
    QUESTION_CHOICE_RULE: [v => !!v || 'Question Choice is required'],
    RIGHT_ANSWER_RULE: [v => !!v || 'Right Answer is required'],
    QUESTION_GROUP_RULE: [v => !!v || 'At least one group is required'],
    QUESTION_TYPE_RULE: [v => !!v || 'At least one type is required'],
    HEADER: [
        {
            text: "No",
            align: "start",
            value: "questionNo",
        },
        {
            text: "Question Text",
            value: "question_text",
        },
        {
            text: "Choice One",
            value: "answer_choice.choice1"
        },
        {
            text: "Choice Two",
            value: "answer_choice.choice2"
        },
        {
            text: "Choice Three",
            value: "answer_choice.choice3"
        },
        {
            text: "Choice Four",
            value: "answer_choice.choice4"
        },
        {
            text: "Choice Five",
            value: "answer_choice.choice5"
        },
        {
            text: "",
            value: "action"
        },
    ],
    ROOT_PATH: "http://localhost:3000/images/"
};

export default constants;
