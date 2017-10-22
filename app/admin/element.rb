ActiveAdmin.register Element do
  belongs_to :task
  fields = %i[name xSize ySize xStart yStart xEnd yEnd isConstant xVelocity yVelocity x y layer image]
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
