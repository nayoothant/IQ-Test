class UsersService
    class << self

        # function: create user
        # params: user form
        # return: is_save
        def create_user(user)
           user = User.new(user)
           user.status = 1
           user.updated_at = Time.now
           is_save = UsersDao.create_user(user)
        end
    end
end