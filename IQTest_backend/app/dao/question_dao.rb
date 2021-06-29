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
            @questions = Question.select("id, question_group, question_type, question_text, answer_choice, questionNo, description, duration").where(question_group: question_group).group_by(&:question_type).values
        end
    end

end