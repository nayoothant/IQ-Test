class Question < ApplicationRecord
    validates :question_group, :question_type, :question_text,:choice_type, :answer_choice, :right_answer, :questionNo,  presence: true
end
