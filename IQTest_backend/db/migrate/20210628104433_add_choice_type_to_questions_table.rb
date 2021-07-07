class AddChoiceTypeToQuestionsTable < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :choice_type, :string
  end
end
