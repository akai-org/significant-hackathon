ActiveAdmin.register Element do
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
  belongs_to :task
  fields = [:name, :xSize, :ySize, :xStart, :yStart, :xEnd, :yEnd, :isConstant, :xVelocity, :yVelocity, :x, :y, :layer, :image]
  permit_params fields

  form do |f|
    f.inputs "Details" do
      fields.each do |field|
        f.input field
      end
    end

    f.actions
  end
end
