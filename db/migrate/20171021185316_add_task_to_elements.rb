class AddTaskToElements < ActiveRecord::Migration[5.1]
  def change
    add_reference :tasks, :element, index: true
    add_foreign_key :tasks, :elements
  end
end
