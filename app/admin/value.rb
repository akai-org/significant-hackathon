ActiveAdmin.register Value do
  belongs_to :task
  permit_params :name, :known, :place, :value
end
