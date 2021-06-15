class AddQuestionsToAnswers < ActiveRecord::Migration[6.1]
  def change
    add_reference :answers, :questions, null: false, foreign_key: true, index: true
  end
end
