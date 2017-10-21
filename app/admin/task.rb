  ActiveAdmin.register Task do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #   permitted = [:permitted, :attributes]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
    permit_params :taskname, :author

    sidebar "Task Details", only: [:show, :edit] do
      ul do
        li link_to "Values",    admin_task_values_path(resource)
        li link_to "Elements", admin_task_elements_path(resource)
        li link_to "Results", admin_task_results_path(resource)
      end
    end
  end
