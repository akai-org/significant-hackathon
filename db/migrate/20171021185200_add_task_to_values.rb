class AddTaskToValues < ActiveRecord::Migration[5.1]
  def change
    add_reference :values, :task, index: true
    add_foreign_key :values, :tasks
  end
end
