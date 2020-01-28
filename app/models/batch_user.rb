class BatchUser < ApplicationRecord
  belongs_to :user
  belongs_to :batch

  validates :batch_id, uniqueness: { scope: :user_id }
end
