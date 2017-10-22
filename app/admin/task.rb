ActiveAdmin.register Task do
  permit_params :taskname, :author

  sidebar "Task Details", only: %i[show edit] do
    ul do
      li link_to "Values", admin_task_values_path(resource)
      li link_to "Elements", admin_task_elements_path(resource)
      li link_to "Results", admin_task_results_path(resource)
    end
  end
end
