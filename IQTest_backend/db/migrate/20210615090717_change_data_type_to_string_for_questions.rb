class ChangeDataTypeToStringForQuestions < ActiveRecord::Migration[6.1]
  def change
    change_column :questions, :question_group, :string
    change_column :questions, :question_type, :string
  end
end
