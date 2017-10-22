class AddAttachmentImageAfterAnimationToElements < ActiveRecord::Migration[5.1]
  def self.up
    change_table :elements do |t|
      t.attachment :image_after_animation
    end
  end

  def self.down
    remove_attachment :elements, :image_after_animation
  end
end
