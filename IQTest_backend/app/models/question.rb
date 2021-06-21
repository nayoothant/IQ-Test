class Question < ApplicationRecord
    validates :question_group, :question_type, :question_text, :right_answer, :questionNo, presence: true
end
