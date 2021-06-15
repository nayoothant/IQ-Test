class AddUsersToAnswers < ActiveRecord::Migration[6.1]
  def change
    add_reference :answers, :users, null: false, foreign_key: true, index: true
  end
end
