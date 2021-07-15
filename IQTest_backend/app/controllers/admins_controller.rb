class AdminsController < ApplicationController

    # function : login
    # admin login
    # params : username, password
    def login
        @admin = Admin.find_by(username: params[:username])

        if @admin && @admin.authenticate(params[:password])
            token = encode_token({admin_id: @admin.id})
            render json: {admin: @admin, token: token}
        else
            render json: {admin: nil, error: Messages::WRONG_UERNAME_PASSWORD}
        end
    end


    private

    def admin_params
        params.permit(:username, :password)
    end
end
