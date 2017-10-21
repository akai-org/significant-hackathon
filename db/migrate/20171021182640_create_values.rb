class CreateValues < ActiveRecord::Migration[5.1]
  def change
    create_table :values do |t|
      t.string :name
      t.string :known
      t.string :place
      t.string :value

      t.timestamps
    end
  end
end