class DropQuestionTransitionTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :question_transitions
  end
end
