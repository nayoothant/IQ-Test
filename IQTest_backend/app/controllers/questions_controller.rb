class QuestionsController < ApplicationController
    before_action :authorized, except: [:get_questions]
    
    # function : question_list
    # get question list
    # params : 
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

    # function : get_question_info
    # get question info
    # params : questionGroup, questionType
    def get_question_info
        @qstGroup = params[:questionGroup]
        @qstType = params[:questionType]
        @questionTypes = QuestionService.get_question_info(@qstGroup, @qstType)
        render json: @questionTypes
    end

    # function : get_question_type
    # get question type
    # params : qstGroup
    def get_question_type
        @qstGroup = params[:qstGroup]
        @questionTypes = QuestionService.get_question_type(@qstGroup)
        render json: @questionTypes
    end

    # function : create_question
    # save questions
    # params : question_form_params
    def create_question
        @qstForm = QuestionForm.new(question_form_params)
        if @qstForm.valid?
            isQuestionCreate = QuestionService.create_question(@qstForm)
            render json: { result: isQuestionCreate }
        end
    end

    # function : update_question
    # update questions
    # params : question_form_params
    def update_question        
        @qstForm = QuestionForm.new(question_form_params)
        if @qstForm.valid?
            isQuestionUpdate = QuestionService.update_question(@qstForm)
            render json: { result: isQuestionUpdate }
        end
    end

    # function : delete_question
    # delete questions
    # params : id
    def delete_question
        isQuestionDelete = QuestionService.delete_question(params[:id])
        render json: { result: isQuestionDelete }
    end

    # function : delete_group
    # delete group
    # params : qstGroup, qstType
    def delete_group
        @qstGroup = params[:qstGroup]
        @qstType = params[:qstType]
        @isGroupDelete = QuestionService.delete_group(@qstGroup, @qstType)
        render json: { result: @isGroupDelete }
    end

    # function : update_question_group
    # update question group
    # params : qstGroupEditForm
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
    
    # function : get_questions
    # get question groups
    # params : 
    def get_questions
        render json: QuestionService.get_questions_group()
    end

    private
    def question_params
        params.require(:question).permit(:id, :qstGroup, :qstType, :qstText, :choiceType, {:answerChoice => [:choice1, :choice2, :choice3, :choice4, :choice5]}, :rightAns, :qstNo, :duration, :description)
    end

    def question_form_params
        params.require(:questionForm).permit(:id, :qstGroup, :qstType, :qstText, :choiceType, {:answerChoice => [:choice1, :choice2, :choice3, :choice4, :choice5]}, :rightAns, :qstNo, :duration, :description)
    end
end
