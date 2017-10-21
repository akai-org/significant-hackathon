class CreateElements < ActiveRecord::Migration[5.1]
  def change
    create_table :elements do |t|
      t.string :name
      t.string :xSize
      t.string :ySize
      t.string :xStart
      t.string :yStart
      t.string :isConstant
      t.string :xVelocity
      t.string :yVelocity
      t.string :x
      t.string :y
    end
  end
end
