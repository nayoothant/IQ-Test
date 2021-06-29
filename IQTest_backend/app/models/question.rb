class Question < ApplicationRecord
    belongs_to :answer
    validates :question_group, :question_type, :question_text, :right_answer, :questionNo, presence: true
end
