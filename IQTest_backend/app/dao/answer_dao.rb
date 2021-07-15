class AnswerDao
    class << self

        # function : save_answer
        # params : answer
        # return : is_save(boolean)
        def save_answer(answer)
            is_save = answer.save
        end
    end
end