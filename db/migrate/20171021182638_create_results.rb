class CreateResults < ActiveRecord::Migration[5.1]
  def change
    create_table :results do |t|
      t.string :leftSide
      t.string :relation
      t.string :rightSide
    end
  end
end
