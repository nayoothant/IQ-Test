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
    end
end