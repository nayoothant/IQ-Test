class AddMarksToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :marks, :double, precision: 5, scale: 2
  end
end
