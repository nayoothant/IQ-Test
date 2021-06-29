class UsersController < ApplicationController
  # before_action :authorized, only: [:create]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # function: Create User
  # params: user form
  # POST /users
  def create
    @user = UsersService.create_user(user_params)

    if @user
      render json: @user, status: :created, location: @user
    else
      render status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    @user_id = params[:userId]
    @user = UsersService.update_user(@user_id)
    if @user
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :updated_at, :name, :phone, :status, :marks)
    end
end
