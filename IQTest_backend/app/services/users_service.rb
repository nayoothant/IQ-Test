class UsersService
    class << self

        # function: create user
        # params: user form
        # return: is_save
        def create_user(user)
           user = User.new(user)
           user.status = 1
           user.updated_at = Time.now
           user.marks = 0.0
           is_save = UsersDao.create_user(user)
           if is_save
            return user
           end
        end

        def update_user(user_id)
            answer_count = Answer.where(users_id: user_id).count
            Rails.logger.debug "answers : #{answer_count}"
            right_answer = Answer.joins(:question).where(users_id: user_id).where('answers.answer = questions.right_answer').count
            Rails.logger.debug "Right_Answer : #{right_answer}"
            wrong_answer = answer_count - right_answer
            Rails.logger.debug "Wrong_Answer : #{wrong_answer}"
            marks = right_answer - (wrong_answer *  0.25)
            Rails.logger.debug "Marks : #{marks}"
            user = User.find(user_id)
            is_update = UsersDao.update_user(user, marks)
        end
    end
end