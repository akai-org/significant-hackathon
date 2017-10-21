class Task < ApplicationRecord
  has_many :elements, dependent: :destroy
  has_many :values, dependent: :destroy
  has_many :results, dependent: :destroy
end
