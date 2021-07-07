class QuestionDao
    class << self
        def show_question_list
            @questions = Question.distinct.pluck(:question_group)
        end

        def get_question_type(questionGroup)
            @questionTypes = Question.where(question_group: questionGroup).group('questions.question_type')
        end

        def get_question_info(questionGroup, questionType)
            @questions = Question.where(question_group: questionGroup, question_type: questionType)
        end

        def get_max_qstNo(questionGroup, questionType)
            @qstNo = Question.where(question_group: questionGroup, question_type: questionType).maximum("questionNo")
        end

        def create_question(question)
            isQuestionCreate = question.save
        end

        def get_question_by_id(id)
            @questions = Question.find(id)
        end

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

        def get_next_question(qstGroup, qstType, qstNo)
            @question = Question.where(question_group: qstGroup, question_type: qstType, questionNo: qstNo)
        end

        def update_description_and_duration(question, description, duration)
            isQuestionUpdate = question.update(
                'description' => description,
                'duration' => duration
            )
        end

        def delete_question(question)
            question.destroy
        end

        def update_qstNo(question, qstNo)
            isQstNoUpdate = question.update(
                'questionNo' => qstNo
            )
        end
    end
    
end