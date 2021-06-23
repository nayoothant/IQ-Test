class RemoveChoiceColumnsFromQuestions < ActiveRecord::Migration[6.1]
  def change
    remove_column :questions, :choice_one
    remove_column :questions, :choice_two
    remove_column :questions, :choice_three
    remove_column :questions, :choice_four
    remove_column :questions, :choice_five
  end
end
