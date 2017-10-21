class AddTaskToElements < ActiveRecord::Migration[5.1]
  def change
    add_reference :elements, :task, index: true
    add_foreign_key :elements, :tasks
  end
end
