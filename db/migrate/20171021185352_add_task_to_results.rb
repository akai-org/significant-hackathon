class AddTaskToResults < ActiveRecord::Migration[5.1]
  def change
    add_reference :tasks, :result, index: true
    add_foreign_key :tasks, :results
  end
end
