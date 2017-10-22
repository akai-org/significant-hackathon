class AddLayerToElements < ActiveRecord::Migration[5.1]
  def change
    add_column :elements, :layer, :string
  end
end
