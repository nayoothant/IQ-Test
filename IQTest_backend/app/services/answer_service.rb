class AnswerService
    class << self
        def store_answers(user_choice, user_data)
            user_id = user_data
            user_choice.each do |question_id, answer_data|
                Rails.logger.debug "question id: #{question_id} answer:#{answer_data}"
                answer_row = Answer.new
                answer_row.answer = answer_data
                answer_row.updated_at = Time.now
                answer_row.users_id = user_id
                answer_row.questions_id = question_id
                is_save = AnswerDao.save_answer(answer_row)
            end
        end
    end

end