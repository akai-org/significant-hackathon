class AddYEndToElements < ActiveRecord::Migration[5.1]
  def change
    add_column :elements, :yEnd, :string
  end
end
