class QuestionForm
    include ActiveModel::Model

    validates  :qstGroup, :qstType, :qstText, :choiceType, :answerChoice, :rightAns, presence: true
    attr_accessor  :id, :qstGroup, :qstType, :qstText, :choiceType, :answerChoice, :rightAns, :qstNo, :duration, :description

    class << self
        def initialize(params)
            @question = Question.new
            @question.id = params.id
            @question.questionNo = params.qstNo
            @question.question_group = params.qstGroup
            @question.question_type = params.qstType
            @question.question_text = params.qstText
            @question.choice_type = params.choiceType
            @question.answer_choice = params.answerChoice
            @question.right_answer = params.rightAns
            @question.duration = params.duration
            @question.description = params.description
            return @question
        end        
    end
end