class AddTaskToValues < ActiveRecord::Migration[5.1]
  def change
    add_reference :tasks, :value, index: true
    add_foreign_key :tasks, :values
  end
end
