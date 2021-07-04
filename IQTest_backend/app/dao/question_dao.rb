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

        def get_questions_group()
            questions_by_group = Question.select("id, question_group, question_type, question_text, answer_choice, questionNo, description, duration").group_by(&:question_group).values
            question = questions_by_group[rand(0..questions_by_group.length-1)]
            return question_by_type = question.group_by(&:question_type).values
        end
    end

end