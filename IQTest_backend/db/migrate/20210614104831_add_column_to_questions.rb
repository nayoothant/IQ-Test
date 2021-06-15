class AddColumnToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :questionNo, :integer, null:false
    add_column :questions, :description, :text
    add_column :questions, :duration, :string
  end
end
