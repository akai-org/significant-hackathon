class AddTaskToResults < ActiveRecord::Migration[5.1]
  def change
    add_reference :results, :task, index: true
    add_foreign_key :results, :tasks
  end
end
