class AnswersController < ApplicationController
  before_action :set_answer, only: [:show, :update, :destroy]


  # function : store_answers
  # save answers
  # params : userChoiceData, userId
  def store_answers
    @user_choice = params[:userChoiceData]
    @user_data = params[:userId]
    is_save = AnswerService.store_answers(@user_choice, @user_data)
    if is_save
      render json: @answer, status: :created, location: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_answer
      @answer = Answer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def answer_params
      # Rails.logger.debug "Params: #{params.inspect}"
      params.require(:answers).permit(:answer, :updated_at, :users_id, :questions_id)
    end
end
