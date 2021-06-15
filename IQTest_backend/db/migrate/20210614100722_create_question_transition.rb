class CreateQuestionTransition < ActiveRecord::Migration[6.1]
  def change
    create_table :question_transitions do |t|
      t.text :description, null:false
      t.string :duration, null:false
      t.timestamps
    end
  end
end
