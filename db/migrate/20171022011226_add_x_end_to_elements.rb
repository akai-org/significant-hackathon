class AddXEndToElements < ActiveRecord::Migration[5.1]
  def change
    add_column :elements, :xEnd, :string
  end
end
