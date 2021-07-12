class QuestionsController < ApplicationController

    def question_list
        objArray = []
        @questions = QuestionService.show_question_list()
        @questions.each do |question|
            list = Hash.new
            list[:qstGroup] = question
            list[:questionTypeList] = QuestionService.get_question_type(question)
            objArray.push(list)
        end
        render json: objArray
    end

    def get_question_info
        @qstGroup = params[:questionGroup]
        @qstType = params[:questionType]
        @questionTypes = QuestionService.get_question_info(@qstGroup, @qstType)
        render json: @questionTypes
    end

    def get_question_type
        @qstGroup = params[:qstGroup]
        @questionTypes = QuestionService.get_question_type(@qstGroup)
        render json: @questionTypes
    end

    def create_question
        @qstForm = QuestionForm.new(question_form_params)
        if @qstForm.valid?
            isQuestionCreate = QuestionService.create_question(@qstForm)
            render json: { result: isQuestionCreate }
        end
    end

    def update_question        
        @qstForm = QuestionForm.new(question_form_params)
        if @qstForm.valid?
            isQuestionUpdate = QuestionService.update_question(@qstForm)
            render json: { result: isQuestionUpdate }
        end
    end

    def delete_question
        isQuestionDelete = QuestionService.delete_question(params[:id])
        render json: { result: isQuestionDelete }
    end

    def delete_group
        @qstGroup = params[:qstGroup]
        @qstType = params[:qstType]
        @isGroupDelete = QuestionService.delete_group(@qstGroup, @qstType)
        render json: { result: @isGroupDelete }
    end

    def update_question_group
        @editForm=params[:qstGroupEditForm]
        isGroupUpdate = false        
        @oldQuestion = QuestionService.get_question_by_id(@editForm[:id])
        @typesOfNewGroup = QuestionService.get_question_type(@editForm[:qstGroup])
        @typesOfOldGroup = QuestionService.get_question_type(@oldQuestion.question_group)
        if @typesOfNewGroup.length > 0 && @editForm[:qstGroup] != @oldQuestion.question_group
            render json: {result: isGroupUpdate, message: Messages::GROUP_EXIST_ERROR_MESSAGE}
        elsif @typesOfOldGroup.any?{|type| type.question_type == @editForm[:qstType] } && @editForm[:qstType] != @oldQuestion.question_type
            render json: {result: isGroupUpdate, message: Messages::TYPE_EXIST_ERROR_MESSAGE}
        else
            isGroupUpdate = QuestionService.update_question_group(@editForm, @oldQuestion)
            render json: {result: isGroupUpdate, message: isGroupUpdate ? Messages::SUCCESSFUL_UPDATE_MESSAGE : Messages::UPDATE_ERROR_MESSAGE}
        end
    end

    private
    def question_params
        params.require(:question).permit(:id, :qstGroup, :qstType, :qstText, :choiceType, {:answerChoice => [:choice1, :choice2, :choice3, :choice4, :choice5]}, :rightAns, :qstNo, :duration, :description)
    end

    def question_form_params
        params.require(:questionForm).permit(:id, :qstGroup, :qstType, :qstText, :choiceType, {:answerChoice => [:choice1, :choice2, :choice3, :choice4, :choice5]}, :rightAns, :qstNo, :duration, :description)
    end
end
