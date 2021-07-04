class AddMarksToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :marks, :double(5,2)
  end
end
