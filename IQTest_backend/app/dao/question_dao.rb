class QuestionDao
    class << self

        # function: show_question_list
        # params: 
        # return: questions(array)
        def show_question_list
            @questions = Question.distinct.pluck(:question_group)
        end

        # function: get_question_type
        # params: question_group
        # return: questionTypes(array)
        def get_question_type(questionGroup)
            @questionTypes = Question.where(question_group: questionGroup).group('questions.question_type')
        end

        # function: get_question_info
        # params: questionGroup, questionType
        # return: questions(array)
        def get_question_info(questionGroup, questionType)
            @questions = Question.where(question_group: questionGroup, question_type: questionType)
        end

        # function: get_max_qstNo
        # params: questionGroup, questionType
        # return: qstNo(int)
        def get_max_qstNo(questionGroup, questionType)
            @qstNo = Question.where(question_group: questionGroup, question_type: questionType).maximum("questionNo")
        end

        # function: create_question
        # params: question
        # return: isQuestionCreate(boolean)
        def create_question(question)
            isQuestionCreate = question.save
        end

        # function: get_question_by_id
        # params: id
        # return: question(object)
        def get_question_by_id(id)
            @question = Question.find(id)
        end

        # function: get_question_by_group
        # params: questionGroup
        # return: questions(array)
        def get_question_by_group(questionGroup)
            @questions = Question.where(question_group: questionGroup)
        end

        # function: get_question_by_group
        # params: questionGroup
        # return: questions(array)
        def update_question(question, questionForm)
            isQuestionUpdate = question.update(
                'questionNo' => questionForm.qstNo,
                'question_group' => questionForm.qstGroup,
                'question_type' => questionForm.qstType,
                'question_text' => questionForm.qstText,
                'right_answer' => questionForm.rightAns,
                'description' => questionForm.description,
                'duration' => questionForm.duration,
                'answer_choice' => questionForm.answerChoice,
                'choice_type' => questionForm.choiceType
            )
        end

        # function: get_question_by_qstNo
        # params: qstGroup, qstType, qstNo
        # return: question(object)
        def get_question_by_qstNo(qstGroup, qstType, qstNo)
            @question = Question.where(question_group: qstGroup, question_type: qstType, questionNo: qstNo)
        end

        # function: update_description_and_duration
        # params: question, description, duration
        # return: isQuestionUpdate(boolean)
        def update_description_and_duration(question, description, duration)
            isQuestionUpdate = question.update(
                'description' => description,
                'duration' => duration
            )
        end

        # function: delete_question
        # params: question
        # return: 
        def delete_question(question)
            question.destroy
        end

        # function: delete_question
        # params: question
        # return: 
        def delete_group(qstGroup, qstType)
            Question.where(question_group: qstGroup, question_type: qstType).destroy_all
        end


        # function: update_qstNo
        # params: question, qstNo
        # return: isQstNoUpdate(boolean)
        def update_qstNo(question, qstNo)
            isQstNoUpdate = question.update(
                'questionNo' => qstNo
            )
        end

        # function: update_question_group
        # params: question, qstGroup
        # return: isGroupUpdate(boolean)
        def update_question_group(question, qstGroup)
            isGroupUpdate = question.update(
                'question_group' => qstGroup
            )
        end

        # function: update_question_Type
        # params: question, qstType
        # return: isTypeUpdate(boolean)
        def update_question_Type(question, qstType)
            isTypeUpdate = question.update(
                'question_type' => qstType
            )
        end

        # function: get_questions_group
        # params: 
        # return: get_questions_group(array)
        def get_questions_group()
            questions_by_group = Question.select("id, question_group, question_type, question_text, choice_type, answer_choice, questionNo, description, duration").group_by(&:question_group).values
            question = questions_by_group[rand(0..questions_by_group.length-1)]
            return question_by_type = question.group_by(&:question_type).values
        end
    end

end