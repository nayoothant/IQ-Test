class UsersDao
    class << self

        # function: get_user_by_email
        # params: email
        # return: user(object)
        def get_user_by_email(email)
            user = User.find_by(email: email)
        end

        # function: get_user_by_phone
        # params: phone
        # return: user(object)
        def get_user_by_phone(phone)
            user = User.find_by(phone: phone)
        end

        # function: create user
        # params: user_params
        # return: is_save(boolean)
        def create_user (user)
            is_save = user.save
        end

        # function: update user
        # params: user_params
        # return: is_update(boolean)
        def update_user (user, marks)
            is_update = user.update(
                'marks' => marks
            )
        end
    end
end