class ChangeAnswerToBeStringInAnswers < ActiveRecord::Migration[6.1]
  def change
    change_column :answers, :answer, :string
  end
end
