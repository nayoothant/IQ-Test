class QuestionService

    class << self

        # function: show_question_list
        # params: 
        # return: questions(array)
        def show_question_list
            @questions = QuestionDao.show_question_list()
        end
        

        # function: get_question_type
        # params: question_group
        # return: questionTypes(array)
        def get_question_type(questionGroup)            
            @questionTypes = QuestionDao.get_question_type(questionGroup)       
        end

        # function: get_question_by_id
        # params: id
        # return: question(object)
        def get_question_by_id(id)            
            @question = QuestionDao.get_question_by_id(id)       
        end

        # function: get_question_info
        # params: questionGroup, questionType
        # return: questions(array)
        def get_question_info(questionGroup, questionType)
            @questions = QuestionDao.get_question_info(questionGroup, questionType)
        end

        # function: create_question
        # params: qstForm
        # return: isQuestionCreate(boolean)
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
                    file_name =  "QuestionNo_" + qstForm.qstNo.to_s+ "_" + attr_name + ".jpg"
                    File.open(dir+"/" + file_name, 'wb') do |f|
                        f.write(Base64.decode64(data_uri_parts[2]))
                    end
                    qstForm.answerChoice[attr_name] = file_name
                end
            end
            @question = QuestionForm.initialize(qstForm)
            puts @question.questionNo
            if @question.valid?
                isQuestionCreate = QuestionDao.create_question(@question)
            end
            
        end

        # function: get_question_by_group
        # params: qstForm
        # return: isQuestionUpdate(boolean)
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
                    file_name =  "QuestionNo_" + qstForm.qstNo.to_s+ "_" + attr_name + ".jpg"
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

        # function: delete_question
        # params: id
        # return: isQuestionDelete
        def delete_question(id)
            @question = QuestionDao.get_question_by_id(id)
            dir = Constants::ROOT_DIR + @question.question_group+ "_" + @question.question_type
            if (@question.questionNo == 1)                
                @qstNo = @question.questionNo + 1
                @nextQuestion = QuestionDao.get_question_by_qstNo(@question.question_group, @question.question_type, @qstNo)
                if (@nextQuestion)
                    isQuestionUpdate = QuestionDao.update_description_and_duration(@nextQuestion, @question.description, @question.duration)
                end
            end
            @count = @question.questionNo + 1
            @maxQstNo = QuestionDao.get_max_qstNo(@question.question_group, @question.question_type)
            until @count > @maxQstNo
                @questionUpdate = QuestionDao.get_question_by_qstNo(@question.question_group, @question.question_type, @count)
                if (@questionUpdate)
                    QuestionDao.update_qstNo(@questionUpdate, @count - 1)
                end
                @count += 1
            end
            @question.answer_choice.each do |attr_name, attr_value|    
                if (@question.choice_type == "image" && attr_value)
                    file_name =  "QuestionNo_" + @question.questionNo.to_s+ "_" + attr_name + ".jpg"
                    file_path = dir + "/" + file_name
                    if File.directory?(dir)
                        FileUtils.rm_f(file_path)        
                    end
                end
            end
            isQuestionDelete = QuestionDao.delete_question(@question)
        end

        # function: delete_group
        # params: qstGroup, qstType
        # return: isGroupDelete
        def delete_group(qstGroup, qstType)
            @questions = QuestionDao.get_question_info(qstGroup, qstType)
            dir = Constants::ROOT_DIR + qstGroup + "_" + qstType
            if @questions.length > 0
                isGroupDelete = QuestionDao.delete_group(qstGroup, qstType)
                if File.directory?(dir)
                    FileUtils.rm_rf(dir)                    
                end
            end
        end

        # function: update_question_group
        # params: editForm, oldQuestion
        # return: isGroupUpdate
        def update_question_group(editForm, oldQuestion)
            dir = Constants::ROOT_DIR
            isGroupUpdate = true
            if editForm[:qstGroup] != oldQuestion.question_group
                @questionGroups = QuestionDao.get_question_by_group(oldQuestion.question_group)
                @questionGroups.each do |questionGroup|
                    isGroupUpdate = QuestionDao.update_question_group(questionGroup, editForm[:qstGroup])
                    if (questionGroup.choice_type == "image")
                        oldPath = oldQuestion.question_group + "_" + questionGroup.question_type
                        newPath = editForm[:qstGroup]  + "_" + questionGroup.question_type
                            if File.directory?("#{dir}#{oldPath}")
                                if(oldPath != newPath)                                    
                                    FileUtils.mv("#{dir}#{oldPath}", "#{dir}#{newPath}")
                                end
                            end
                    end
                end
            end
            if editForm[:qstType] != oldQuestion.question_type
                @questions = QuestionDao.get_question_info(editForm[:qstGroup], oldQuestion.question_type)
                @questions.each do |question|
                    if (question.choice_type == "image")
                        newPath = editForm[:qstGroup]  + "_" + editForm[:qstType]              
                        oldPath = editForm[:qstGroup] + "_" + question.question_type
                            if File.directory?("#{dir}#{oldPath}")
                                if(oldPath != newPath)                                    
                                    FileUtils.mv("#{dir}#{oldPath}", "#{dir}#{newPath}")
                                end
                            end
                    end
                    isGroupUpdate = QuestionDao.update_question_Type(question, editForm[:qstType])
                end
            end
            isGroupUpdate = QuestionDao.update_description_and_duration(oldQuestion, editForm[:description], editForm[:duration])
        end

        # function: get_questions_group
        # params: 
        # return: questions(array)
        def get_questions_group()
            @questions = QuestionDao.get_questions_group()
        end
    end
end