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

    def get_questions
        @question_group = params[:question_group]
        render json: QuestionService.get_questions_group(@question_group)
    end

    private
    def question_params
        params.require(:question).permit(:question_group, :question_type, :question_text, :choice_one, :choice_two, :choice_three, :choice_four, :choice_five, :right_answer, :questionNo, :description, :duration)
    end
end
