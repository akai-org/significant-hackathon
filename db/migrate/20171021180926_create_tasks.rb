class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :taskname
      t.string :author

      t.timestamps
    end
  end
end
