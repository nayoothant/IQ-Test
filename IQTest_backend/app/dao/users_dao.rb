class UsersDao
    class << self

        # function: create user
        # params: create
        # return: is_save(boolean)
        def create_user (user)
            is_save = user.save
        end
    end
end