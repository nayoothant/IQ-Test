class QuestionService

    class << self
        def show_question_list
            @questions = QuestionDao.show_question_list()
        end
        
        def get_question_type(questionGroup)            
            @questionTypes = QuestionDao.get_question_type(questionGroup)       
        end

        def get_question_info(questionGroup, questionType)
            @questions = QuestionDao.get_question_info(questionGroup, questionType)
        end

        def create_question(qstForm)
            @qstNo = QuestionDao.get_max_qstNo(qstForm.qstGroup, qstForm.qstType)
            if @qstNo
                qstForm.qstNo = @qstNo + 1                
            else
                qstForm.qstNo = 1
            end
            dir = Constants::ROOT_DIR + qstForm.qstGroup + "_" + qstForm.qstType
            qstForm.answerChoice.each do |attr_name, attr_value|       
            if (qstForm.choiceType == "image" && attr_value)
                    FileUtils.mkdir_p(dir) unless File.directory?(dir)

                    data_uri_parts = attr_value.match(Constants::REGEX) || []
                    file_name = qstForm.qstGroup + "_" + qstForm.qstType + "_" + qstForm.qstNo.to_s+ "_" + attr_name + ".jpg"
                    File.open(dir+"/" + file_name, 'wb') do |f|
                        f.write(Base64.decode64(data_uri_parts[2]))
                    end
                    qstForm.answerChoice[attr_name] = file_name
                end
            end
            @question = QuestionForm.initialize(qstForm)
            if @question.valid?
                isQuestionCreate = QuestionDao.create_question(@question)
            end
            
        end

        def update_question(qstForm)           
            @question = QuestionDao.get_question_by_id(qstForm.id)
            dir = Constants::ROOT_DIR + qstForm.qstGroup + "_" + qstForm.qstType
            qstForm.answerChoice.each do |attr_name, attr_value|       
            if (qstForm.choiceType == "image" && attr_value)                
                if File.directory?(dir)
                    FileUtils.rm_f(dir)                    
                else
                    FileUtils.mkdir_p(dir)
                end

                    data_uri_parts = attr_value.match(Constants::REGEX) || []
                    file_name = qstForm.qstGroup + "_" + qstForm.qstType + "_" + qstForm.qstNo.to_s+ "_" + attr_name + ".jpg"
                    File.open(dir+"/" + file_name, 'wb') do |f|
                        f.write(Base64.decode64(data_uri_parts[2]))
                    end
                    qstForm.answerChoice[attr_name] = file_name
                end
            end
            if @question.valid?                
                isQuestionUpdate = QuestionDao.update_question(@question, qstForm)
            end
        end

        def delete_question(id)
            @question = QuestionDao.get_question_by_id(id)
            if (@question.questionNo == 1)                
                @qstNo = @question.questionNo + 1
                @nextQuestion = QuestionDao.get_next_question(@question.question_group, @question.question_type, @qstNo)
                if (@nextQuestion)
                    isQuestionUpdate = QuestionDao.update_description_and_duration(@nextQuestion, @question.description, @question.duration)
                end
            end
            @count = @question.questionNo + 1
            @maxQstNo = QuestionDao.get_max_qstNo(@question.question_group, @question.question_type)
            until @count > @maxQstNo
                @questionUpdate = QuestionDao.get_next_question(@question.question_group, @question.question_type, @count)
                if (@questionUpdate)
                    QuestionDao.update_qstNo(@questionUpdate, @count - 1)
                end
                @count += 1
            end
            isQuestionDelete = QuestionDao.delete_question(@question)
        end
    end
end