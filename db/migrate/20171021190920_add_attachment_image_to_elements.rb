class AddAttachmentImageToElements < ActiveRecord::Migration[5.1]
  def self.up
    change_table :elements do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :elements, :image
  end
end
