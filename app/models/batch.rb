# frozen_string_literal: true

class Batch < ApplicationRecord
  include LearnCoModel

  attribute :iteration, :string

  validates :iteration, presence: true

  has_many :batch_users
  has_many :users, through: :batch_users

  def to_s
    iteration
  end
end
