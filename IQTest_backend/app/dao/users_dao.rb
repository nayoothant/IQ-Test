class UsersDao
    class << self

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