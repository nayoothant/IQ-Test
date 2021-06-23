class ChangeDataTypeForRightAnswer < ActiveRecord::Migration[6.1]
  def change
    change_column :questions, :right_answer, :string
  end
end
