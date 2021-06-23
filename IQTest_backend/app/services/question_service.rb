class QuestionService

    class << self
        def show_question_list
            @questions = QuestionDao.show_question_list()
        end

        def get_question_type(questionGroup)
            @questionTypes = QuestionDao.get_question_type(questionGroup)
        end

        def get_question_info(questionGroup, questionType)
            @questions = QuestionDao.get_question_info(questionGroup, questionType)
        end

        def get_questions_group(question_group)
            @questions = QuestionDao.get_questions_group(question_group)
        end
    end
end