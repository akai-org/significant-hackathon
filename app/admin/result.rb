ActiveAdmin.register Result do
  belongs_to :task
  permit_params :leftSide, :relation, :rightSide
end
