class AddAnswerChoiceColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :answer_choice, :json, null:false
  end
end
