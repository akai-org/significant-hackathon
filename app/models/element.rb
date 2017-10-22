class Element < ApplicationRecord
  belongs_to :task

  has_attached_file :image, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_attached_file :image_after_animation, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image_after_animation, content_type: /\Aimage\/.*\z/
end
