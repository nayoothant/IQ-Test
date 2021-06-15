class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.integer :question_group, null:false
      t.integer :question_type, null:false
      t.text :question_text, null:false
      t.string :choice_one
      t.string :choice_two
      t.string :choice_three
      t.string :choice_four
      t.string :choice_five
      t.integer :right_answer, null:false
      t.timestamps
    end
  end
end
