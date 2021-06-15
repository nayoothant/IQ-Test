class AddColumnToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :name, :string
    add_column :users, :phone, :string, unique:true
    add_column :users, :status, :integer
  end
end
