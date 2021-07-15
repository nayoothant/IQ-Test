class ApplicationController < ActionController::API
    # before_action :authorized

    def encode_token(payload)
        JWT.encode(payload, 'yourSecret')
    end

    def auth_header
        # { Authorization: 'Bearer <token>' }
        request.headers['Authorization']
    end

    def decoded_token
        if auth_header
        token = auth_header
        # header: { 'Authorization': 'Bearer <token>' }
        begin
            JWT.decode(token, 'yourSecret', true, algorithm: 'HS256')
        rescue JWT::DecodeError
            nil
        end
        end
    end

    def logged_in_user
        if decoded_token
            admin_id = decoded_token[0]['admin_id']
            @admin = Admin.find_by(id: admin_id)
        end
    end

    def logged_in?
        !!logged_in_user
    end

    def authorized
        render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end
end
