class QuestionDao
    class << self
        def show_question_list
            @questions = Question.distinct.pluck(:question_group)
        end

        def get_question_type(questionGroup)
            @questionTypes = Question.where(question_group: questionGroup).group('questions.question_type')
        end

        def get_question_info(questionGroup, questionType)
            @questions = Question.where(question_group: questionGroup, question_type: questionType)
        end

        def get_questions_group(question_group)
            @questions = Question.where(question_group: question_group)
        end
    end

end