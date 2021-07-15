class UsersService
    class << self

        # function: get_user_by_email
        # params: email
        # return: user(object)
        def get_user_by_email(email)
            user = UsersDao.get_user_by_email(email) 
        end

        # function: get_user_by_phone
        # params: phone
        # return: user(object)
        def get_user_by_phone(phone)
            user = UsersDao.get_user_by_phone(phone) 
        end

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

        # function: update_user
        # params: user_id
        # return: is_update
        def update_user(user_id)
            answer_count = Answer.where(users_id: user_id).count
            right_answer = Answer.joins(:question).where(users_id: user_id).where('answers.answer = questions.right_answer').count
            wrong_answer = answer_count - right_answer
            marks = right_answer - (wrong_answer *  0.25)
            user = User.find(user_id)
            is_update = UsersDao.update_user(user, marks)
        end
    end
end