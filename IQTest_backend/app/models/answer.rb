class Answer < ApplicationRecord
    belongs_to :question, class_name: "Question", foreign_key: "questions_id"
    belongs_to :user, class_name: "User", foreign_key: "users_id"

    validates :users_id, uniqueness: { scope: :questions_id, message: "Already answer"}
end
